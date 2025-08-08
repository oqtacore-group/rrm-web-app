import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyEditDialogComponent } from './vacancy-edit-dialog.component';

describe('VacancyEditDialogComponent', () => {
  let component: VacancyEditDialogComponent;
  let fixture: ComponentFixture<VacancyEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VacancyEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancyEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
