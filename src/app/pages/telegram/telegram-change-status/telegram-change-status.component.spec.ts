import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramChangeStatusComponent } from './telegram-change-status.component';

describe('TelegramChangeStatusComponent', () => {
  let component: TelegramChangeStatusComponent;
  let fixture: ComponentFixture<TelegramChangeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelegramChangeStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelegramChangeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
