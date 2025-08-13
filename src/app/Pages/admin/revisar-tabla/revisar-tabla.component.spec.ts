import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarTablaComponent } from './revisar-tabla.component';

describe('RevisarTablaComponent', () => {
  let component: RevisarTablaComponent;
  let fixture: ComponentFixture<RevisarTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisarTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevisarTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
