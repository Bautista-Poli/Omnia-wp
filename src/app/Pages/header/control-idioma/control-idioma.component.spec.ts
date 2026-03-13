import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlIdiomaComponent } from './control-idioma.component';

describe('ControlIdiomaComponent', () => {
  let component: ControlIdiomaComponent;
  let fixture: ComponentFixture<ControlIdiomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlIdiomaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
