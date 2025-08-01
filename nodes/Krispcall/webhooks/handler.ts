import { IHookFunctions } from 'n8n-workflow';
import { WEBHOOK } from '../constants/core';
import { makeApiRequest } from '../utils/apiRequest';

export async function createWebhook(
	this: IHookFunctions,
	eventType: string,
): Promise<{ id: string }> {
	const webhookUrl = this.getNodeWebhookUrl('default');

	// Prepare the request body
	const body = {
		hookUrl: webhookUrl,
		action: eventType,
	};
	try {
		// Make the API request to create the webhook
		const response = await makeApiRequest.call(this, {
			method: 'POST',
			endpoint: WEBHOOK.CREATE,
			body: body,
		});
		return response;
	} catch (error) {
		throw new Error(`Failed to create KrispCall webhook: ${error.message}`);
	}
}

export async function deleteWebhook(this: IHookFunctions, webhookId: string): Promise<void> {
	try {
		// Make the API request to delete the webhook
		await makeApiRequest.call(this, {
			method: 'DELETE',
			endpoint: WEBHOOK.DELETE,
			body: {
				hookUrl: webhookId,
			},
		});
	} catch (error) {
		throw new Error(`Failed to delete KrispCall webhook: ${error.message}`);
	}
}
