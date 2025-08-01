import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { validatePhoneNumber } from '../utils/validation';
import { makeApiRequest } from '../utils/apiRequest';
import { ENDPOINTS } from '../constants/endpoints';

export async function sendSms(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const fromNumber = this.getNodeParameter('fromNumber', itemIndex) as string;
	const toNumber = this.getNodeParameter('toNumber', itemIndex) as string;
	const content = this.getNodeParameter('content', itemIndex) as string;

	// validate Phone number
	validatePhoneNumber.call(this, fromNumber, itemIndex);
	validatePhoneNumber.call(this, toNumber, itemIndex);

	// Build the data object
	const data: IDataObject = {
		from_number: fromNumber,
		to_number: toNumber,
		content: content,
	};

	const response = await makeApiRequest.call(this, {
		method: 'POST',
		endpoint: ENDPOINTS.SEND_SMS,
		body: data,
	});

	return response;
}

export async function sendMms(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const fromNumber = this.getNodeParameter('fromNumber', itemIndex) as string;
	const toNumber = this.getNodeParameter('toNumber', itemIndex) as string;
	const content = this.getNodeParameter('content', itemIndex) as string;

	// validate Phone number
	validatePhoneNumber.call(this, fromNumber, itemIndex);
	validatePhoneNumber.call(this, toNumber, itemIndex);

	// medias
	const medias = this.getNodeParameter('medias', itemIndex) as {
		media: Array<{ url: string }>;
	};

	// Build the data object
	const data: IDataObject = {
		from_number: fromNumber,
		to_number: toNumber,
		content: content,
		medias: medias.media.map((media: { url: string }) => media.url),
	};

	const response = await makeApiRequest.call(this, {
		method: 'POST',
		endpoint: ENDPOINTS.SEND_MMS,
		body: data,
	});

	return response;
}

export async function getSms(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	// Make the API request to retrieve the SMS
	const response = await makeApiRequest.call(this, {
		method: 'GET',
		endpoint: ENDPOINTS.GET_SMS,
	});

	return response;
}
