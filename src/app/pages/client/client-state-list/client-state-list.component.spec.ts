import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStateListComponent } from './client-state-list.component';

describe('ClientStateListComponent', () => {
  let component: ClientStateListComponent;
  let fixture: ComponentFixture<ClientStateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientStateListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientStateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
