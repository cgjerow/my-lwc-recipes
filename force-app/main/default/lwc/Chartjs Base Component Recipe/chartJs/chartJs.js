import { LightningElement, api } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chart';

export default class ChartJs extends LightningElement 
{
    chart;
    chartjsInitialized = false;
    scriptLoaded = false;

    @api async initializeChart(config) 
    {
        if (this.chartjsInitialized) return;
        
        await this.loadChartJs();
        this.chartjsInitialized = true;
        const ctx = this.template.querySelector('.chartjs-chart').getContext('2d');
        this.chart = new window.Chart(ctx, config);
    }

    async loadChartJs()
    {
        if (this.scriptLoaded) return;
        await loadScript(this,chartjs);
        this.scriptLoaded = true;
    }
}