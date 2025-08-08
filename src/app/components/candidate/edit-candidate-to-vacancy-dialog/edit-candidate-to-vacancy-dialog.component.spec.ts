import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidateToVacancyDialogComponent } from './edit-candidate-to-vacancy-dialog.component';

describe('EditCandidateToVacancyDialogComponent', () => {
  let component: EditCandidateToVacancyDialogComponent;
  let fixture: ComponentFixture<EditCandidateToVacancyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCandidateToVacancyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCandidateToVacancyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
