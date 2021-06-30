import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentosLocalidadesComponent } from './departamentos-localidades.component';

describe('DepartamentosLocalidadesComponent', () => {
  let component: DepartamentosLocalidadesComponent;
  let fixture: ComponentFixture<DepartamentosLocalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentosLocalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentosLocalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
