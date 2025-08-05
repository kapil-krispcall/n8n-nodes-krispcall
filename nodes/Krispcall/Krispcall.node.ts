import {
	IExecuteFunctions,
	NodeConnectionType,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow'; // Import NodeApiError for better error reporting
import { ILoadOptionsFunctions } from 'n8n-workflow';
import { getNumbers } from './operations/ContactOperations';
import { handleOperation } from './operations/handlers';
import { CORE } from './constants/core'; // Import constants for better maintainability

import { fields, operations, resource } from './descriptions';

export class Krispcall implements INodeType {
	description: INodeTypeDescription = {
		displayName: CORE.DISPLAY_NAME, // Changed display name for better readability
		name: CORE.NAME,
		icon: 'file:Krispcall.svg',
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}', // Dynamic subtitle based on operation and resource
		group: ['transform'],
		version: 1,
		description: CORE.DESCRIPTION, // More specific description
		defaults: {
			name: CORE.DISPLAY_NAME,
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'krispcallApi',
				required: true,
			},
		],
		properties: [...resource, ...operations, ...fields],
	};
	methods = {
		loadOptions: {
			async getFromNumbers(this: ILoadOptionsFunctions) {
				const response = await getNumbers.call(this);
				return response.map((item: IDataObject) => {
					return {
						name: ` ${item.name} | ${item.number}`,
						value: item.number,
					};
				});
			},
		},
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const result = await handleOperation.call(this, resource, operation, itemIndex);
				returnData.push({ json: result });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message }, pairedItem: { item: itemIndex } });
				} else {
					throw new NodeApiError(this.getNode(), error, { itemIndex });
				}
			}
		}

		// Always return an array of arrays of INodeExecutionData
		return [returnData];
	}
}
