import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClasesAgregarComponent } from './admin-clases-agregar.component';

describe('AdminClasesAgregarComponent', () => {
  let component: AdminClasesAgregarComponent;
  let fixture: ComponentFixture<AdminClasesAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClasesAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminClasesAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
