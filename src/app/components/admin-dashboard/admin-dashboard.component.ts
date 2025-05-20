import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { UserService } from '../../service/users/user.service';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule, RouterModule, CommonModule,NgApexchartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}/Users`;
  users: User[] = [];
  loading = true;
  error = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers(): void {
    this.loading = true;
  
    this.userService.getAllUsers()
      .subscribe({
        next: (users) => {
          this.users = users;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          this.error = 'שגיאה בטעינת המשתמשים';
          this.loading = false;
        }
      });
  }
  
  toggleBlockUser(userId: number, currentStatus: boolean): void {
    const action = currentStatus ? 'לבטל חסימה של' : 'לחסום';
    if (!confirm(`האם אתה בטוח שברצונך ${action} משתמש זה?`)) {
      return;
    }
  
    const newStatus = !currentStatus;
  
    this.userService.toggleBlockUser(userId, newStatus)
      .subscribe({
        next: () => {
          const user = this.users.find(u => u.id === userId);
          if (user) {
            user.isBlocked = newStatus;
          }
        },
        error: (err) => {
          console.error('Error updating user block status:', err);
          this.error = 'שגיאה בעדכון סטטוס חסימה של המשתמש';
        }
      });
  }
  
  logout(): void {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    this.router.navigate(['/login']);
  }
}
