import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSparepartComponent } from './view-sparepart.component';

describe('ViewSparepartComponent', () => {
  let component: ViewSparepartComponent;
  let fixture: ComponentFixture<ViewSparepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSparepartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSparepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
