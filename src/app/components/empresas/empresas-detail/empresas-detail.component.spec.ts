import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasDetailComponent } from './empresas-detail.component';

describe('EmpresasDetailComponent', () => {
  let component: EmpresasDetailComponent;
  let fixture: ComponentFixture<EmpresasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresasDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
