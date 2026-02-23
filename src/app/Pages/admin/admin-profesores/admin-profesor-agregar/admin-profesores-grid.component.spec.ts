import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfesoresGridComponent } from './admin-profesores-grid.component';

describe('AdminProfesoresGridComponent', () => {
  let component: AdminProfesoresGridComponent;
  let fixture: ComponentFixture<AdminProfesoresGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProfesoresGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProfesoresGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
