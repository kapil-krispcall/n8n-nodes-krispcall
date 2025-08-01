import { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export function validatePhoneNumber(
	this: IExecuteFunctions,
	number: string,
	itemIndex: number,
): void {
	if (!number || typeof number !== 'string') {
		throw new NodeApiError(
			this.getNode(),
			{
				message: `Phone Number is required and must be a string.`,
			},
			{ itemIndex },
		);
	}

	if (!number.startsWith('+') || number.length < 10) {
		throw new NodeApiError(
			this.getNode(),
			{ message: 'Invalid phone number format. Must start with "+" and include country code.' },
			{ itemIndex },
		);
	}
}

export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
