import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { validatePhoneNumber } from '../utils/validation';
import { makeApiRequest } from '../utils/apiRequest';

import { ENDPOINTS } from '../constants/endpoints';

export async function createContact(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const number = this.getNodeParameter('number', itemIndex) as string;
	const name = this.getNodeParameter('name', itemIndex, '') as string;
	const email = this.getNodeParameter('email', itemIndex, '') as string;
	const company = this.getNodeParameter('company', itemIndex, '') as string;
	const address = this.getNodeParameter('address', itemIndex, '') as string;

	// validate phone number
	validatePhoneNumber.call(this, number, itemIndex);

	const data: IDataObject = { number };

	if (name && name.trim()) data.name = name.trim();
	if (email && email.trim()) data.email = email.trim();
	if (company && company.trim()) data.company = company.trim();
	if (address && address.trim()) data.address = address.trim();

	const response = await makeApiRequest.call(this, {
		method: 'POST',
		endpoint: ENDPOINTS.ADD_CONTACT,
		body: data,
	});
	return response;
}

export async function getContacts(this: IExecuteFunctions): Promise<any> {
	const response = await makeApiRequest.call(this, {
		method: 'GET',
		endpoint: ENDPOINTS.GET_CONTACTS,
	});
	return response;
}

export async function deleteContact(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const rawNumbers = this.getNodeParameter('numbers', itemIndex) as {
		contactGroup: { contact: string }[];
	};
	const contacts: string[] = [];

	if (rawNumbers?.contactGroup?.length) {
		for (const entry of rawNumbers.contactGroup) {
			if (entry.contact) {
				contacts.push(entry.contact.trim());
			}
		}
	}

	if (contacts.length === 0) {
		throw new Error('No phone numbers provided for deletion.');
	}

	const data: IDataObject = { contacts: contacts };

	const response = await makeApiRequest.call(this, {
		method: 'DELETE',
		endpoint: `${ENDPOINTS.DELETE_CONTACT}`,
		body: data,
	});
	return response;
}

export async function getVoicemail(this: IExecuteFunctions): Promise<any> {
	const response = await makeApiRequest.call(this, {
		method: 'GET',
		endpoint: ENDPOINTS.GET_VOICEMAIL,
	});
	return response;
}

export async function getNumbers(this: IExecuteFunctions): Promise<any> {
	const response = await makeApiRequest.call(this, {
		method: 'GET',
		endpoint: ENDPOINTS.GET_NUMBERS,
	});
	return response;
}
