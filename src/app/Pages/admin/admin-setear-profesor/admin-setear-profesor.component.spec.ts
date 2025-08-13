import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetearProfesorComponent } from './admin-setear-profesor.component';

describe('AdminSetearProfesorComponent', () => {
  let component: AdminSetearProfesorComponent;
  let fixture: ComponentFixture<AdminSetearProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSetearProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSetearProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
