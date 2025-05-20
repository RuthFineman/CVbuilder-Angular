import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Template {
  id: number;
  name: string;
  templateUrl: string;
  inUse: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private apiUrl = `${environment.apiUrl}/Template`;

  constructor(private http: HttpClient) {}

  getAllTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.apiUrl}/files`);
  }

  toggleTemplateStatus(id: number, inUse: boolean): Observable<Template> {
    return this.http.patch<Template>(
      `${this.apiUrl}/${id}/status`,
      inUse,
      { headers: { 'Content-Type': 'application/json' } }
    ).pipe(
      tap(response => console.log('Patch response:', response))
    );
  }
}
