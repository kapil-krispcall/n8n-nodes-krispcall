import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';
import { CORE } from '../nodes/Krispcall/constants/core';
import { ENDPOINTS } from '../nodes/Krispcall/constants/endpoints';

export class KrispcallApi implements ICredentialType {
	name = CORE.CREDENTIALS.NAME;
	displayName = CORE.CREDENTIALS.DISPLAY_NAME;
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.krispcall.com/api/v3/platform/n8n',
			description: 'The base URL for the API. Default is the KrispCall API base URL.',
			placeholder: 'https://app.krispcall.com/api/v3/platform/n8n',
			required: true,
		},

		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
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
			baseURL: `={{$credentials.baseUrl}}`,
			url: ENDPOINTS.ME,
			method: 'GET',
		},
	};
}
