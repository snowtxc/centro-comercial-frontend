import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorOcurredComponent } from './error-ocurred.component';

describe('ErrorOcurredComponent', () => {
  let component: ErrorOcurredComponent;
  let fixture: ComponentFixture<ErrorOcurredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorOcurredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorOcurredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
