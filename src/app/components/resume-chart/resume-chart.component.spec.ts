import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeChartComponent } from './resume-chart.component';

describe('ResumeChartComponent', () => {
  let component: ResumeChartComponent;
  let fixture: ComponentFixture<ResumeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
