import { LightningElement, api, track } from 'lwc';
import ChartJs from 'c/chartJs';

export default class TrendChart extends ChartJs 
{
    @api label;
    @api borderColor = 'rgb(72,165,221)';
    @api backgroundColor = 'rgba(72,165,221,.1)';
     @api
    get dates() { return this._dates; }
    set dates(values) { this._dates = values; this.setupChart(); }
    _dates;

    @api 
    get values() { return this._data; }
    set values(values) { this._data = values; this.setupChart(); }
    _data;
    
    get configuration()
    {
        return {
            type: 'line',
            data: {
                datasets: [{
                    label: this.label,
                    backgroundColor: this.backgroundColor,
                    borderColor: this.borderColor,
                    data: this._buildDataObject(this._dates, this._data),
                }]
            },
            options: {
                legend: {
                    display: false,
                },
                elements: {
                    line: {
                        tension: 0
                    }
                },
                responsive:true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 6,
                        },
                    }],
                    xAxes: [{
                        type:'time',
                        unit: 'year',
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }],
                },
                tooltips: {
                    intersect: false,
                }
            }
        };
    }

    @api setupChart()
    {
        if (this.values && this.dates)
            this.initializeChart(this.configuration);
    }


    _buildDataObject()
    {
        let points = [];
        for (let i=0; i<this._dates.length; i++)
            points.push({ x: new Date(this._dates[i]), y: (i<this._data.length ? this._data[i] : null) });
        return points;
    }
}