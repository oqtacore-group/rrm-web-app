import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidateToVacancyDialogComponent } from './add-candidate-to-vacancy-dialog.component';

describe('AddCandidateToVacancyDialogComponent', () => {
  let component: AddCandidateToVacancyDialogComponent;
  let fixture: ComponentFixture<AddCandidateToVacancyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCandidateToVacancyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCandidateToVacancyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
