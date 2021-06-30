import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasCreateComponent } from './empresas-create.component';

describe('EmpresasCreateComponent', () => {
  let component: EmpresasCreateComponent;
  let fixture: ComponentFixture<EmpresasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresasCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
