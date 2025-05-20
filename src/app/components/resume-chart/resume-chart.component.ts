import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexTooltip } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { DashboardStatistics, StatisticsService } from '../../service/statistics.service';
import { Chart } from 'chart.js';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-resume-chart',
  imports: [NgApexchartsModule,CommonModule,MatProgressSpinnerModule,MatCardModule],
  templateUrl: './resume-chart.component.html',
  styleUrl: './resume-chart.component.css'
})
export class ResumeChartComponent implements OnInit{
  constructor(private http: HttpClient) {}
  public chartOptions!: ChartOptions;

  ngOnInit(): void {
    // this.loadTemplateUsageChart()
    this.http.get<any[]>('https://localhost:7020/file-cv/resumes-by-hour').subscribe(data => {
      const categories = data.map(d => d.time); // ISO Strings
      const values = data.map(d => d.count);

      this.chartOptions = {
        series: [{
          name: "קורות חיים",
          data: values
        }],
        chart: {
          height: 350,
          type: "area"
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          categories: categories
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      };
    });
  }
}
