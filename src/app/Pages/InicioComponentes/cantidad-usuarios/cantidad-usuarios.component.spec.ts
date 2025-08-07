import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadUsuariosComponent } from './cantidad-usuarios.component';

describe('CantidadUsuariosComponent', () => {
  let component: CantidadUsuariosComponent;
  let fixture: ComponentFixture<CantidadUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantidadUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CantidadUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
