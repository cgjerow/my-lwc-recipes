import { LightningElement, api, track } from 'lwc';

export default class RepeaterField extends LightningElement 
{
    @api 
    get value() { return this.getValues(); }
    set value(val)
    {
        if (!val) val = [];
        
        let vals = [""];
        for (let i=0;i<val.length;i++)
            vals[i] = val[i];

        let fields = this._getInputs();
        for (let i=0; i<fields.length; i++)
            fields[i].value = vals[i];

        this.values = vals;
    }
    @api buttonClass;
    @api required;
    @api firstLabel;
    @api repeatLabel;
    @api firstVariant;
    @api repeatVariant;
    @api disabled;
    @api type;
    @api formatter;
    @api max;
    @api maxInputs;
    @api readOnly;

    @track values = [""];
    get valuesObjects()
    {
        let vals = [];
        for (let i=0; i<this.values.length; i++)
        {
            vals[i] = {
                value: this.values[i],
                key: i
            };
        }
        return vals;
    }
    get disabledOrReadOnly() { return this.disabled || this.readOnly; }


    @api
    getValues()
    {
        let tmpValues = [];
        for (let field of this._getInputs())
            tmpValues.push(field.value);
        return tmpValues;
    }

    @api
    reset()
    {
        this.value = [""];
    }

    @api
    reportValidity()
    {
        let validity = true;
        for (let field of this._getInputs())
        {
            validity ? validity = field.reportValidity() : field.reportValidity();
        }
        return validity;
    }

    _addInput()
    {
        let vals = Object.assign([],this.values);
        vals.push("");
        this.values = vals;
    }

    _removeInput(event)
    {
        let index = event.currentTarget.dataset.key;
        let vals = this.getValues();
        if (index > -1)
            vals.splice(index, 1);
        this.values = vals;
    }

    _getInputs()
    {
        let inputs = [];
        inputs.push(...this.template.querySelectorAll('lightning-input'));
        return inputs;
    }
}