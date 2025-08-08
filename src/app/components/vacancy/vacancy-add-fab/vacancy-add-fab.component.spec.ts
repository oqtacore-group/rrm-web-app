import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyAddFabComponent } from './vacancy-add-fab.component';

describe('VacancyAddFabComponent', () => {
  let component: VacancyAddFabComponent;
  let fixture: ComponentFixture<VacancyAddFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VacancyAddFabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancyAddFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
