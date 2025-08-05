import { IExecuteFunctions } from 'n8n-workflow';
import { RESOURCE } from '../constants/resource';
import { OPERATION } from '../constants/operations';

import {
	createContact,
	getContacts,
	deleteContact,
	getVoicemail,
	getNumbers,
} from '../operations/ContactOperations';

import { getSms, sendMms, sendSms } from './SmsOperations';

export async function handleOperation(
	this: IExecuteFunctions,
	resource: string,
	operation: string,
	index: number,
) {
	if (resource === RESOURCE.CONTACT) {
		switch (operation) {
			case OPERATION.CREATE:
				return await createContact.call(this, index);
			case OPERATION.GET_ALL:
				return await getContacts.call(this);
			case OPERATION.DELETE:
				return await deleteContact.call(this, index);
			case OPERATION.GET_VOICEMAIL:
				return await getVoicemail.call(this);
			case OPERATION.GET_NUMBERS:
				return await getNumbers.call(this);
		}
	}

	if (resource === RESOURCE.SMS) {
		switch (operation) {
			case OPERATION.SEND:
				return await sendSms.call(this, index);
			case OPERATION.SEND_MMS:
				return await sendMms.call(this, index);
			case OPERATION.GET_ALL:
				return await getSms.call(this, index);
		}
	}

	throw new Error(`The operation "${operation}" is not supported for the resource "${resource}".`);
}
