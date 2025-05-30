import { Component, OnInit } from '@angular/core';
import { DashboardStatistics, StatisticsService } from '../../service/statistics/statistics.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexTooltip } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-dashboard',
  imports: [MatProgressSpinnerModule,MatCardModule,CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  statistics: DashboardStatistics | null = null;
  isLoading = true;
  public chartOptions!: ChartOptions;
  constructor(private statisticsService: StatisticsService,private http:HttpClient) {}

  ngOnInit(): void {
    this.loadDashboardData();
    
    this.http.get<any[]>('https://localhost:7020/file-cv/resumes-by-hour').subscribe(data => {
      const categories = data.map(d => d.time); 
      const values = data.map(d => d.count);

      this.chartOptions = {
        series: [{
          name: "קורות חיים",
          data: values
        }],
        chart: {
          height: 350,
          type: "area",
          zoom: {
            enabled: false
          }
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

  loadDashboardData(): void {
    this.isLoading = true;

    this.statisticsService.getDashboardStatistics().subscribe({
      next: (data) => {
        this.statistics = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard statistics', error);
        this.isLoading = false;
      },
    });
  }
}
