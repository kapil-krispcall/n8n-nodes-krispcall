import { IHookFunctions } from 'n8n-workflow';
import { WEBHOOK } from '../constants/core';

export function resolveWebhookUrl(this: IHookFunctions, path: string): string {
	const customUrl = WEBHOOK.URL;
	if (customUrl) {
		return `${customUrl}/webhook/${path}`;
	}
	return this.getNodeWebhookUrl('default') + `/${path}`;
}
