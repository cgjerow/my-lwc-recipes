import { api, track, wire } from 'lwc';
import getFinancials from '@salesforce/apex/CompanyFinancialsController.getFinancials';
import ApexChart from 'c/apexChart';

export default class NetMarginApexChart extends ApexChart 
{
    @api recordId;
    _financials;
    _labels;
    _hasInit = false;
    @track config = {
        colors: ['#00BAEC'],
        series: [{
            name: "Net Margin Percentage",
            data: [], // set by wired method
        }],
        chart: {
            type: 'area',
            background: '#FFFFFF',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            ext: 'Net Margin Percentage',
            align: 'left'
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            y: 0,
            labels: {
                formatter: (value) => { return value +'%' },
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    };


    @wire(getFinancials,{accountId: '$recordId'}) financials(response)
    {
        if (!response.data)
            return;

        this._financials = response.data.map(report => { 
            return [new Date(report.Report_Date__c), report.Net_Margin_Percentage__c];
        });
        this._labels = response.data.map(report => report.Report_Date__c);
        this.setData();
        this._hasInit = true;

        this.initializeChart(this.config);
    }

    setData()
    {
        this.config.series[0].data = this._financials;
    }
}