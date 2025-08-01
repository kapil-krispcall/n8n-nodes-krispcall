import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';
import { API_BASE_URL, CORE } from '../nodes/Krispcall/constants/core';
import { ENDPOINTS } from '../nodes/Krispcall/constants/endpoints';

export class KrispcallApi implements ICredentialType {
	name = CORE.CREDENTIALS.NAME;
	displayName = CORE.CREDENTIALS.DISPLAY_NAME;
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: API_BASE_URL,
			description: 'The base URL for the API. Default is the KrispCall API base URL.',
			placeholder: API_BASE_URL,
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': `={{$credentials.apiKey}}`,
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: API_BASE_URL,
			url: ENDPOINTS.ME,
			method: 'GET',
		},
	};
}
