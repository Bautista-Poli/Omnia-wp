import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlotGridComponent } from './admin-slot-grid.component';

describe('AdminSlotGridComponent', () => {
  let component: AdminSlotGridComponent;
  let fixture: ComponentFixture<AdminSlotGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSlotGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSlotGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
