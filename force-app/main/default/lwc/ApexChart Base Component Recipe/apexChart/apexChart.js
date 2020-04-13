import { LightningElement, api } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import apexcharts from '@salesforce/resourceUrl/apexChartsBundle';

export default class ApexChart extends LightningElement 
{
    async initializeChart(config)
    {
        await this._loadResources();
        const div = document.createElement('div');
        this.template.querySelector('.apex-chart').appendChild(div);
        new ApexCharts(div, config ).render();
    }

    async _loadResources()
    {
        await loadStyle(this, apexcharts+'/dist/apexcharts.css');
        await loadScript(this, apexcharts+'/dist/apexcharts.js');
    }
}