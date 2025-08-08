import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWithNoteDialogComponent } from './confirm-with-note-dialog.component';

describe('ConfirmWithNoteDialogComponent', () => {
  let component: ConfirmWithNoteDialogComponent;
  let fixture: ComponentFixture<ConfirmWithNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmWithNoteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmWithNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
