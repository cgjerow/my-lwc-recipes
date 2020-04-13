import { LightningElement, api, track } from 'lwc';

const RED_COLORS = 
{
    backgroundColor: "red",
    fontColor: "white",
}
const YELLOW_COLORS = 
{
    backgroundColor: "#ffbf00", // amber
    fontColor: "black",
}
const GREEN_COLORS = 
{
    backgroundColor: "green",
    fontColor: "white",
}
const BLANK_COLORS = 
{
    backgroundColor: "white",
    fontColor: "white",
}
const colorMap = {
    RED: RED_COLORS,
    YELLOW: YELLOW_COLORS,
    GREEN: GREEN_COLORS,
    BLANK: BLANK_COLORS
}


export default class TrafficLightField extends LightningElement
{
    @api conditionStrategy; // Implements getColor(value) method and return RED, YELLOW, GREEN, or BLANK strings
    @api value;
    @api label;
    @api outputFormat;
    @api outputOverride;
    @api
    get backgroundColor() {
        return this.getColor().backgroundColor;
    };
    @api
    get fontColor() {
        return this.getColor().fontColor;
    };

    getColor()
    {
       return colorMap[this.conditionStrategy.getColor(this.value)]
    }
}