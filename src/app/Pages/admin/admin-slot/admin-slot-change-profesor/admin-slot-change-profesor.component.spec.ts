import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlotChangeProfesorComponent } from './admin-slot-change-profesor.component';

describe('AdminSlotChangeProfesorComponent', () => {
  let component: AdminSlotChangeProfesorComponent;
  let fixture: ComponentFixture<AdminSlotChangeProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSlotChangeProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSlotChangeProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
