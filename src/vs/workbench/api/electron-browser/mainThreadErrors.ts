/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { SerializedError, onUnexpectedError } from 'vs/base/common/errors';
import { MainThreadErrorsShape, MainContext } from '../node/extHost.protocol';
import { extHostNamedCustomer } from 'vs/workbench/api/electron-browser/extHostCustomers';

@extHostNamedCustomer(MainContext.MainThreadErrors)
export class MainThreadErrors implements MainThreadErrorsShape {

	dispose(): void {
		//
	}

	$onUnexpectedError(err: any | SerializedError): void {
		if (err.$isError) {
			const { name, message, stack } = err;
			err = new Error();
			err.message = message;
			err.name = name;
			err.stack = stack;
		}
		onUnexpectedError(err);
	}
}
