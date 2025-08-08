import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddFabComponent } from './client-add-fab.component';

describe('ClientAddFabComponent', () => {
  let component: ClientAddFabComponent;
  let fixture: ComponentFixture<ClientAddFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientAddFabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAddFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
