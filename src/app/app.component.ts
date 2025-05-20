import { Component } from '@angular/core';
import {  RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    RouterLink, 
    RouterModule,
    RouterLinkActive, NgApexchartsModule,NgApexchartsModule,MatTableModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'CVBuilder';
  
}
