import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparepartAddUpComponent } from './sparepart-add-up.component';

describe('SparepartAddUpComponent', () => {
  let component: SparepartAddUpComponent;
  let fixture: ComponentFixture<SparepartAddUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparepartAddUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SparepartAddUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
