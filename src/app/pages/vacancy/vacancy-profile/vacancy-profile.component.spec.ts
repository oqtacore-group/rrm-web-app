import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyProfileComponent } from './vacancy-profile.component';

describe('VacancyProfileComponent', () => {
  let component: VacancyProfileComponent;
  let fixture: ComponentFixture<VacancyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VacancyProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
