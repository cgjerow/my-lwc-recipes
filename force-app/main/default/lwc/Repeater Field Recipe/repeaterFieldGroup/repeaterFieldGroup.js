import { LightningElement, api, track } from 'lwc';

export default class RepeaterFieldGroup extends LightningElement 
{
    connectedCallback()
    {
        this.value = this.value;
    }

    _value;
    @api 
    get value() { return this.getValues(); }
    set value(val)
    {
        this._value = val ? val : [];
        let vals = [{inputs: Object.assign([],this.configuration.inputs)}];
        for (let i=0;i<val.length;i++)
        {
            vals[i] = {inputs: Object.assign([],this.configuration.inputs)};
            vals[i].key = i.toString();
            for (let j=0; j<this.configuration.inputs.length; j++)
            {
                let input = this.configuration.inputs[j];
                vals[i].inputs[j] = Object.assign({}, vals[i].inputs[j]);
                vals[i].inputs[j].value = val[i][input.key] ? val[i][input.key] : '';
                vals[i].inputs[j].checked = val[i][input.key]==true;
            }
        }
        this.values = vals;


        let groups = this._getInputsByGroup();
        for (let i=0; i<groups.length; i++)
        {
            for (let j=0; j<groups[i].length; j++)
            {
                groups[i][j].value = val[i] ? val[i][groups[i][j].dataset.key] : '';
                groups[i][j].checked = val[i] && val[i][groups[i][j].dataset.key]==true;
            }
        }
    }
    @api buttonClass;
    @api required;
    @api disabled;
    @api readOnly;
    @api configuration;

    @track values = [""];
    get valuesObjects()
    {
        let vals = [];
        for (let i=0; i<this.values.length; i++)
        {
            vals[i] = {
                value: this.values[i],
                key: i,
            };
        }
        return vals;
    }
    get disabledOrReadOnly() { return this.disabled || this.readOnly; }


    @api
    getValues()
    {
        let tmpValues = [];
        for (let group of this._getInputsByGroup())
        {
            let groupObj = {};
            for (let input of group)
            {
                groupObj[input.dataset.key] = input.dataset.checkbox ? input.checked : input.value;
            }
            tmpValues.push(groupObj);
        }
        return tmpValues;
    }
   

    @api
    reset()
    {
        this.value = this._value;
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
        vals.push(Object.assign({},vals[0]));
        vals[vals.length-1].inputs = Object.assign([],vals[0].inputs);
        vals[vals.length-1].key = vals.length > 2 ? (parseInt(vals[vals.length-2].key)+3).toString() : 2;
        for (let i=0; i<vals[0].inputs.length; i++)
        {
            vals[vals.length-1].inputs[i] = Object.assign({},vals[0].inputs[i]);
            vals[vals.length-1].inputs[i].value = '';
            vals[vals.length-1].inputs[i].checked = false;
        }
        this.values = vals;
    }

    _removeInput(event)
    {
        let index = event.currentTarget.dataset.key;
        let vals = this._getConfigurationWithValues();
        if (index > -1)
            vals.splice(index, 1);

        this.values = vals;
    }
     
    _getConfigurationWithValues()
    {
        let tmpValues =  JSON.parse(JSON.stringify(this.values));
        let inputsByGroup = this._getInputsByGroup();
        for (let i=0; i<inputsByGroup.length; i++)
        {
            let group = inputsByGroup[i];
            let tmpGroupValues = tmpValues[i];

            for (let j=0; j<group.length; j++)
            {
                let input = group[j];
                let tmpInputValue = tmpGroupValues.inputs[j]

                tmpInputValue.value = input.value;
            }
        }
        return tmpValues;
    }

    _getInputs()
    {
        let inputs = [];
        inputs.push(...this.template.querySelectorAll('lightning-input'));
        return inputs;
    }

    _getInputsByGroup()
    {
        let inputGroups = this._getInputGroups();
        let inputs = inputGroups.map((group) => this._getInputsFromGroup(group));
        return inputs;
    }
    _getInputGroups()
    {
        let inputGroups = [];
        inputGroups.push(...this.template.querySelectorAll('.repeater-input-group'));
        return inputGroups;
    }

    _getInputsFromGroup(inputGroup)
    {
        let inputs = [];
        inputs.push(...inputGroup.querySelectorAll('lightning-input'));
        return inputs;
    }
}