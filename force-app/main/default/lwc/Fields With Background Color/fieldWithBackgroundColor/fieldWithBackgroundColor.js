import { LightningElement, api } from 'lwc';
import { NumberFormatter, TextFormatter, CurrencyFormatter, PercentFormatter } from './formatters';

const formatters = 
{
    number: new NumberFormatter(),
    text: new TextFormatter(),
    currency: new CurrencyFormatter(),
    percent: new PercentFormatter(),
    custom: null
}

export default class FieldWithBackgroundColor extends LightningElement 
{
    @api label;
    @api value;
    @api backgroundColor;
    @api fontColor;
    @api outputFormat = "text"; // Options: number, text, currency, percent, custom (with customFormatter strategy)
    @api customFormatter;
    @api outputOverride;
    @api editable;

    @api get outputSize(){ return this.value ? this.format().length : 1; }
    @api get output() { return this.format() }

    connectedCallback()
    {
        formatters.custom = this.customFormatter;
    }

    renderedCallback()
    {
        let componentBase = this.template.querySelector("article");
        componentBase.style.setProperty("--color-background", this.backgroundColor);
        componentBase.style.setProperty("--color-font", this.fontColor);
    }

    format()
    {
        return this.outputOverride ? this.outputOverride.toString().trim() : 
                formatters[this.outputFormat]
                .format(this.value)
                .toString()
                .trim();
    }
}