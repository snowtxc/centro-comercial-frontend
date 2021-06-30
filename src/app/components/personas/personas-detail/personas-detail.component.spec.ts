import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasDetailComponent } from './personas-detail.component';

describe('PersonasDetailComponent', () => {
  let component: PersonasDetailComponent;
  let fixture: ComponentFixture<PersonasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonasDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
