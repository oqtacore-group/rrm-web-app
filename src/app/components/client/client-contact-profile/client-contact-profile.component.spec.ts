import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactProfileComponent } from './client-contact-profile.component';

describe('ClientContactProfileComponent', () => {
  let component: ClientContactProfileComponent;
  let fixture: ComponentFixture<ClientContactProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientContactProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientContactProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
