import { IHookFunctions } from 'n8n-workflow';

export function resolveWebhookUrl(this: IHookFunctions, path: string): string {
	return this.getNodeWebhookUrl('default') + `/${path}`;
}
