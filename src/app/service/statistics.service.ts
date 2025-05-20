import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStatistics {
  totalUsers: number
  totalCVs: number
  totalTemplates: number
  activeUsers: number
  blockedUsers: number
  cvsCreatedToday: number
  usersRegisteredToday: number
}

export interface MonthlyData {
  month: string
  count: number
}

export interface TemplateUsage {
  templateName: string
  usageCount: number
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = `${environment.apiUrl}/statistics`

  constructor(private http: HttpClient) {}

  getDashboardStatistics(): Observable<DashboardStatistics> {
    return this.http.get<DashboardStatistics>(`${this.apiUrl}/dashboard`)
  }

  // getMonthlyUserRegistrations(): Observable<MonthlyData[]> {
  //   return this.http.get<MonthlyData[]>(`${this.apiUrl}/users/monthly`)
  // }

  getTemplateUsage(): Observable<TemplateUsage[]> {
    return this.http.get<TemplateUsage[]>(`${this.apiUrl}/cv/templates`)
  }

  // getMonthlyCVCreations(): Observable<MonthlyData[]> {
  //   return this.http.get<MonthlyData[]>(`${this.apiUrl}/cv/created/monthly`)
  // }
}
