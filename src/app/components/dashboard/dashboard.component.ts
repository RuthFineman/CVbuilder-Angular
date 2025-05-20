import { Component, OnInit } from '@angular/core';
import { DashboardStatistics, StatisticsService } from '../../service/statistics.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-dashboard',
  imports: [MatProgressSpinnerModule,MatCardModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  statistics: DashboardStatistics | null = null
  isLoading = true
  charts: { [key: string]: Chart } = {}

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadDashboardData()
  }

  loadDashboardData(): void {
    this.isLoading = true

    // Get main statistics
    this.statisticsService.getDashboardStatistics().subscribe({
      next: (data) => {
        this.statistics = data
        this.isLoading = false
        this.loadTemplateUsageChart()
        this.createUserStatusChart()
      },
      error: (error) => {
        console.error("Error loading dashboard statistics", error)
        this.isLoading = false
      },
    })
  }

 
  loadTemplateUsageChart(): void {
    this.statisticsService.getTemplateUsage().subscribe({
      next: (data) => {
        this.createPieChart(
          "templateUsageChart",
          "Template Usage",
          data.map((item) => item.templateName),
          data.map((item) => item.usageCount),
        )
      },
      error: (error) => console.error("Error loading template usage chart", error),
    })
  }

  createUserStatusChart(): void {
    if (!this.statistics) return

    const data = [this.statistics.activeUsers, this.statistics.blockedUsers]
    const labels = ["Active Users", "Blocked Users"]

    this.createPieChart("userStatusChart", "User Status", labels, data)
  }

  createLineChart(
    canvasId: string,
    label: string,
    labels: string[],
    data: number[],
    backgroundColor: string,
    borderColor: string,
  ): void {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!canvas) return

    // Destroy existing chart if it exists
    if (this.charts[canvasId]) {
      this.charts[canvasId].destroy()
    }

    this.charts[canvasId] = new Chart(canvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }

  createPieChart(canvasId: string, label: string, labels: string[], data: number[]): void {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!canvas) return

    // Destroy existing chart if it exists
    if (this.charts[canvasId]) {
      this.charts[canvasId].destroy()
    }

    // Generate colors for pie chart
    const backgroundColors = this.generateColors(data.length)

    this.charts[canvasId] = new Chart(canvas, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: label,
          },
        },
      },
    })
  }

  generateColors(count: number): string[] {
    const colors = [
      "rgba(255, 99, 132, 0.7)",
      "rgba(54, 162, 235, 0.7)",
      "rgba(255, 206, 86, 0.7)",
      "rgba(75, 192, 192, 0.7)",
      "rgba(153, 102, 255, 0.7)",
      "rgba(255, 159, 64, 0.7)",
      "rgba(199, 199, 199, 0.7)",
      "rgba(83, 102, 255, 0.7)",
      "rgba(40, 159, 64, 0.7)",
      "rgba(210, 199, 199, 0.7)",
    ]

    // If we need more colors than we have, just repeat them
    if (count > colors.length) {
      const extraColors = []
      for (let i = 0; i < count - colors.length; i++) {
        extraColors.push(colors[i % colors.length])
      }
      return [...colors, ...extraColors]
    }

    return colors.slice(0, count)
  }
}
