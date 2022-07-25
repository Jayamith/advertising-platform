import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAddUpComponent } from './vehicle-add-up.component';

describe('VehicleAddUpComponent', () => {
  let component: VehicleAddUpComponent;
  let fixture: ComponentFixture<VehicleAddUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleAddUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAddUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
