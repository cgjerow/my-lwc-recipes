import { LightningElement, api, track } from 'lwc';

export default class NumberRangeTrafficLightField extends LightningElement 
{
    @api redYellowBoundary;
    @api yellowGreenBoundary;
    @api isRedToGreenDescending;
    @api value;
    @api label;
    @api outputFormat;
    @api outputOverride;
    @track conditionStrategy;

    connectedCallback()
    {
        this.value = Number.parseFloat(this.value);
        this.conditionStrategy = new NumberRangeColorStrategy(this.redYellowBoundary,this.yellowGreenBoundary,this.isRedToGreenDescending);
    }
}

class NumberRangeColorStrategy
{
    redYellowBoundary;
    yellowGreenBoundary;
    isRedToGreenDescending;

    constructor(redYellowBoundary, yellowGreenBoundary, isRedToGreenDescending)
    {
        this.redYellowBoundary = redYellowBoundary;
        this.yellowGreenBoundary = yellowGreenBoundary;
        this.isRedToGreenDescending = isRedToGreenDescending;
    }

    getColor(value)
    {
        if (!value)
            return "BLANK"
        
        if (!this.isRedToGreenDescending)
        {
            if (value < this.redYellowBoundary)
                return "RED";
            else if (value < this.yellowGreenBoundary)
                return "YELLOW";
            else
                return "GREEN";
        }
        else 
        {
            if (value >= this.redYellowBoundary)
                return "RED";
            else if (value >= this.yellowGreenBoundary)
                return "YELLOW";
            else
                return "GREEN";
        }
    }
}