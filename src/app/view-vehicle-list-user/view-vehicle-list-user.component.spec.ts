import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVehicleListUserComponent } from './view-vehicle-list-user.component';

describe('ViewVehicleListUserComponent', () => {
  let component: ViewVehicleListUserComponent;
  let fixture: ComponentFixture<ViewVehicleListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVehicleListUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVehicleListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
