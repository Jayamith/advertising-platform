import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandAddUpComponent } from './land-add-up.component';

describe('LandAddUpComponent', () => {
  let component: LandAddUpComponent;
  let fixture: ComponentFixture<LandAddUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandAddUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandAddUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
