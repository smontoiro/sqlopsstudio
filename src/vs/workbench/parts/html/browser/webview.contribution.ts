/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from 'vs/nls';
import { KeyMod, KeyCode } from 'vs/base/common/keyCodes';
import { ContextKeyExpr, } from 'vs/platform/contextkey/common/contextkey';
import { KeybindingsRegistry } from 'vs/platform/keybinding/common/keybindingsRegistry';

import { IWorkbenchActionRegistry, Extensions as ActionExtensions } from 'vs/workbench/common/actions';
import { KEYBINDING_CONTEXT_WEBVIEWEDITOR_FIND_WIDGET_INPUT_FOCUSED, KEYBINDING_CONTEXT_WEBVIEWEDITOR_FOCUS, KEYBINDING_CONTEXT_WEBVIEW_FIND_WIDGET_VISIBLE } from './webviewEditor';
import { SyncActionDescriptor } from 'vs/platform/actions/common/actions';
import { Registry } from 'vs/platform/registry/common/platform';
import { ShowWebViewEditorFindWidgetAction, ShowWebViewEditorFindTermCommand, HideWebViewEditorFindCommand, OpenWebviewDeveloperToolsAction, ReloadWebviewAction } from './webviewCommands';


const category = 'Webview';
const webviewDeveloperCategory = nls.localize('developer', "Developer");

const actionRegistry = <IWorkbenchActionRegistry>Registry.as(ActionExtensions.WorkbenchActions);

actionRegistry.registerWorkbenchAction(new SyncActionDescriptor(ShowWebViewEditorFindWidgetAction, ShowWebViewEditorFindWidgetAction.ID, ShowWebViewEditorFindWidgetAction.LABEL, {
	primary: KeyMod.CtrlCmd | KeyCode.KEY_F
}, KEYBINDING_CONTEXT_WEBVIEWEDITOR_FOCUS),
	'Webview: Focus Find Widget', category);


const showNextFindTermCommand = new ShowWebViewEditorFindTermCommand({
	id: 'editor.action.webvieweditor.showNextFindTerm',
	precondition: KEYBINDING_CONTEXT_WEBVIEWEDITOR_FIND_WIDGET_INPUT_FOCUSED,
	kbOpts: {
		primary: KeyMod.Alt | KeyCode.DownArrow
	}
}, true);
KeybindingsRegistry.registerCommandAndKeybindingRule(showNextFindTermCommand.toCommandAndKeybindingRule(KeybindingsRegistry.WEIGHT.editorContrib()));

const showPreviousFindTermCommand = new ShowWebViewEditorFindTermCommand({
	id: 'editor.action.webvieweditor.showPreviousFindTerm',
	precondition: KEYBINDING_CONTEXT_WEBVIEWEDITOR_FIND_WIDGET_INPUT_FOCUSED,
	kbOpts: {
		primary: KeyMod.Alt | KeyCode.UpArrow
	}
}, false);
KeybindingsRegistry.registerCommandAndKeybindingRule(showPreviousFindTermCommand.toCommandAndKeybindingRule(KeybindingsRegistry.WEIGHT.editorContrib()));


const hideCommand = new HideWebViewEditorFindCommand({
	id: 'editor.action.webvieweditor.hideFind',
	precondition: ContextKeyExpr.and(
		KEYBINDING_CONTEXT_WEBVIEWEDITOR_FOCUS,
		KEYBINDING_CONTEXT_WEBVIEW_FIND_WIDGET_VISIBLE),
	kbOpts: {
		primary: KeyCode.Escape
	}
});
KeybindingsRegistry.registerCommandAndKeybindingRule(hideCommand.toCommandAndKeybindingRule(KeybindingsRegistry.WEIGHT.editorContrib()));


actionRegistry.registerWorkbenchAction(
	new SyncActionDescriptor(OpenWebviewDeveloperToolsAction, OpenWebviewDeveloperToolsAction.ID, OpenWebviewDeveloperToolsAction.LABEL),
	'Webview Tools',
	webviewDeveloperCategory);

actionRegistry.registerWorkbenchAction(
	new SyncActionDescriptor(ReloadWebviewAction, ReloadWebviewAction.ID, ReloadWebviewAction.LABEL),
	'Reload Webview',
	webviewDeveloperCategory);