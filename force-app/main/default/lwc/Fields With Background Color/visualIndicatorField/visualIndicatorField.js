import { LightningElement, track, api} from 'lwc';

export default class VisualIndicatorField extends LightningElement 
{
    @api value;
    @api fieldConfiguration;
    get isNumberRangeTrafficField() 
    {
        return this.fieldConfiguration.getType()=="NumberRangeTrafficFieldConfiguration"; 
    }
}

export class FieldConfiguration
{
    constructor ()
    {
        if (new.target === FieldConfiguration) throw TypeError("Cannot construct abstract class: FieldConfiguration");
        this.getType();
    }

    getType()
    {
        throw TypeError("Subclasses must override method: getType");
    }
}

export class NumberRangeTrafficFieldConfiguration extends FieldConfiguration
{
    apiName;
    label;
    value = "";
    outputFormat;
    outputOverride;
    redYellowBoundary;
    yellowGreenBoundary;
    isRedToGreenDescending;
    
    constructor(apiName, label, outputFormat, redYellowBoundary, yellowGreenBoundary, isRedToGreenDescending)
    {
        super();
        this.apiName = apiName;
        this.label = label;
        this.outputFormat = outputFormat;
        this.redYellowBoundary = redYellowBoundary;
        this.yellowGreenBoundary = yellowGreenBoundary;
        this.isRedToGreenDescending = isRedToGreenDescending;
    }

    getType()
    {
        return "NumberRangeTrafficFieldConfiguration";
    }
}