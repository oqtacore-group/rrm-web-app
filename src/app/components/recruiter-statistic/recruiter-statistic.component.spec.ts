import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterStatisticComponent } from './recruiter-statistic.component';

describe('RecruiterStatisticComponent', () => {
  let component: RecruiterStatisticComponent;
  let fixture: ComponentFixture<RecruiterStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterStatisticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
