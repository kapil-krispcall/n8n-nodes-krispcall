import { API_BASE_URL } from '../constants/core';
import { IExecuteFunctions, IHookFunctions, IHttpRequestMethods } from 'n8n-workflow';

interface ApiRequestOptions {
	method: IHttpRequestMethods;
	endpoint: string;
	body?: any;
	headers?: Record<string, string>;
	query?: number;
}
export async function makeApiRequest(
	this: IExecuteFunctions | IHookFunctions,
	{ method, endpoint, body = {}, headers = {} }: ApiRequestOptions,
): Promise<any> {
	const options = {
		method,
		uri: `${API_BASE_URL}${endpoint}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...headers,
		},
		body,
		json: true,
	} as const;

	return await this.helpers.requestWithAuthentication.call(this, 'krispcallApi', options);
}
