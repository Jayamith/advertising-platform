import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVehicleListAdminComponent } from './view-vehicle-list-admin.component';

describe('ViewVehicleListAdminComponent', () => {
  let component: ViewVehicleListAdminComponent;
  let fixture: ComponentFixture<ViewVehicleListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVehicleListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVehicleListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
