import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyCandidateProfileComponent } from './vacancy-candidate-profile.component';

describe('VacancyCandidateProfileComponent', () => {
  let component: VacancyCandidateProfileComponent;
  let fixture: ComponentFixture<VacancyCandidateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VacancyCandidateProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancyCandidateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
