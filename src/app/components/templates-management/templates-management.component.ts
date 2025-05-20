import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Template, TemplateService } from '../../service/template/template.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  
  selector: 'app-templates-management',
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,MatListModule,MatChipsModule
  ],
  templateUrl: './templates-management.component.html',
  styleUrl: './templates-management.component.css'
})
export class TemplatesManagementComponent implements OnInit {
  templates: Template[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private svc: TemplateService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  private loadTemplates(): void {
    this.isLoading = true;
    this.svc.getAllTemplates().subscribe({
      next: (data: Template[]) => {
        console.log('Templates:', data);
        console.log('Templates:', data);

        this.templates = data;
        this.isLoading = false;
      }      
      ,
      error: err => {
        console.error(err);
        this.error = 'שגיאה בטעינת התבניות';
        this.isLoading = false;
      }
    });
  }
  publish(t: Template): void {
    this.svc.toggleTemplateStatus(t.id, true).subscribe({
      next: updated => {
        t.inUse = updated.inUse;
        this.snack.open('התבנית פורסמה בהצלחה', 'סגור', { duration: 3000 });
      },
      error: () => {
        this.snack.open('שגיאה בפרסום התבנית', 'סגור', { duration: 3000 });
      }
    });
  }
  
  unpublish(t: Template): void {
    this.svc.toggleTemplateStatus(t.id, false).subscribe({
      next: updated => {
        t.inUse = updated.inUse;
        this.snack.open('הסר פרסום התבנית בהצלחה', 'סגור', { duration: 3000 });
      },
      error: () => {
        this.snack.open('שגיאה בהסרת פרסום', 'סגור', { duration: 3000 });
      }
    });
  }
}
