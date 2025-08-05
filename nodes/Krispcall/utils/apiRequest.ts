import {
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

interface ApiRequestOptions {
	method: IHttpRequestMethods;
	endpoint: string;
	body?: any;
	headers?: Record<string, string>;
	query?: number;
}
export async function makeApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	{ method, endpoint, body = {}, headers = {} }: ApiRequestOptions,
): Promise<any> {
	const credentials = await this.getCredentials('krispcallApi');

	const baseUrl = credentials.baseUrl;
	const options = {
		method,
		uri: `${baseUrl}${endpoint}`,
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
