import { LightningElement, api, track } from 'lwc';

export default class TrendField extends LightningElement
{
    @api value;
    @api trendDirection; // positive, negative, flat
    @api inverted; // used to switch positive trends to red & negative to green
    @api label;
    @api outputFormat;
    @api outputOverride;
    @track conditionStrategy;

    connectedCallback()
    {
        if (!this.outputFormat && !this.outputOverride)
            throw Error("Invalid arguments: either outputFormat or outputOverride must be provided");

        this.value = Number.parseInt(this.value);
        this.conditionStrategy = new TrendStrategy(this.trendDirection,this.inverted);
    }
}

class TrendStrategy 
{
    _trendDirection;
    _invertedDirections = 
    {
        positive: 'negative',
        negative: 'positive',
        flat: 'flat',
    }
    _colors = 
    {
        positive: 'GREEN',
        negative: 'RED',
        flat: 'GREEN',
    }

    constructor(trendDirection, inverted)
    {
        if (!this._colors[trendDirection]) throw Error('Invalid Argument: Trend Direction supports only \'positive\', \'negative\', and \'flat\' options.');
        this._trendDirection = inverted ? this._invertDirection(trendDirection) : trendDirection;
    }

    getColor(value)
    {
        if (!value) return 'BLANK';
        return this._colors[this._trendDirection];
    }

    _invertDirection(direction)
    {
        return this._invertedDirections[direction];
    }
}