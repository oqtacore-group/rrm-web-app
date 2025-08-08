import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyStatisticComponent } from './vacancy-statistic.component';

describe('VacancyStatisticComponent', () => {
  let component: VacancyStatisticComponent;
  let fixture: ComponentFixture<VacancyStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VacancyStatisticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancyStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
