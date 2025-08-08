import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyCandidateListComponent } from './vacancy-candidate-list.component';

describe('VacancyCandidateListComponent', () => {
  let component: VacancyCandidateListComponent;
  let fixture: ComponentFixture<VacancyCandidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VacancyCandidateListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancyCandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
