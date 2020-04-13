import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class VisualIndicatorFields extends LightningElement 
{
    @api fields = [];
    @api wiredFields;
    @api fieldConfigurations;
    @api recordId;
    @api title;

    @wire(getRecord, { recordId: '$recordId', fields: '$wiredFields' })
    financials(response) {
        let error = response && response.error;
        let data = response && response.data;
        if (data) {
            this.fields = [];
            this.fieldConfigurations.forEach(config => {
                let field = data.fields[config.apiName];
                config.value = field.value ? field.value : "";
                config.outputOverride = field.displayValue ? field.displayValue : "";
                this.fields.push(config);
            });
            this.error = undefined;
        } else if (error) {
            this.error = error;
        }
    }
}