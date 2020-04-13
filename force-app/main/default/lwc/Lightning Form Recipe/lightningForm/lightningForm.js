import { LightningElement, api, track } from 'lwc';

export default class LightningForm extends LightningElement 
{
    @api 
    get columns() { return this._columns; };
    set columns(values)
    {
        let columns = [];
        let i = 0;
        for (let column of values)
        {
            column = Object.assign({},column);
            let fields = [];
            let j = 0;
            for (let field of column.fields)
            {
                field = Object.assign({},field);
                field.isRepeater = field.type == 'repeater';
                field.isRepeaterGroup = field.type == 'repeaterGroup';
                field.isPicklist = field.type == 'picklist';
                field.isPlaceholder = field.type == 'placeholder';
                field.isForm = field.type == 'form';
                field.isInput = this._inputTypes.includes(field.type);
                field.id = j;
                if (field.type) fields.push(field);
                j++;
            }
            column.fields = fields;
            column.id = i;
            columns.push(column);
            i++;
        }
        this._columns = columns;
        this.setAttribute('columns',this._columns);

        this._getElements();
    }
    @api
    get value() { return this.getValues(); }
    set value(value)
    {
        this._value = value;
        for (let element of this._getElements())
        {
            element.value = value ? value[element.dataset.key] : '';
        }
    }
    @api flexibility;
    @track _columns;
    _value;
    _inputTypes = ['checkbox', 'date', 'datetime', 'time', 'email', 'file', 'password', 'search', 'tel', 'url', 'number', 'radio', 'toggle']

    renderedCallback()
    {
        this.value = this._value;
    }

    @api
    reportValidity()
    {
        let validity = true;
        for (let element of this._getElements())
            validity = element.reportValidity() && validity;
        return validity;
    }

    @api
    getValues()
    {
        let values = {};
        for (let element of this._getElements())
            values[element.dataset.key] = element.value;
        return values;
    }

    _getElements()
    {
        let elements = [];
        elements.push(...this.template.querySelectorAll('lightning-input'));
        elements.push(...this.template.querySelectorAll('lightning-combobox'));
        elements.push(...this.template.querySelectorAll('c-repeater-field'));
        elements.push(...this.template.querySelectorAll('c-lightning-form'));
        elements.push(...this.template.querySelectorAll('c-repeater-field-group'));
        return elements;
    }
}