import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateEventComponent } from './candidate-event.component';

describe('CandidateEventComponent', () => {
  let component: CandidateEventComponent;
  let fixture: ComponentFixture<CandidateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
