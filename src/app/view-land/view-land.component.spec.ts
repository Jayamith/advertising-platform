import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLandComponent } from './view-land.component';

describe('ViewLandComponent', () => {
  let component: ViewLandComponent;
  let fixture: ComponentFixture<ViewLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
