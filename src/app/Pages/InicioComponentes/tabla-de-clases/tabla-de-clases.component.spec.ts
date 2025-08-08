import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDeClasesComponent } from './tabla-de-clases.component';

describe('TablaDeClasesComponent', () => {
  let component: TablaDeClasesComponent;
  let fixture: ComponentFixture<TablaDeClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaDeClasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaDeClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
