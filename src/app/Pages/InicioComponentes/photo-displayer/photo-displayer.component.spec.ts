import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDisplayerComponent } from './photo-displayer.component';

describe('PhotoDisplayerComponent', () => {
  let component: PhotoDisplayerComponent;
  let fixture: ComponentFixture<PhotoDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoDisplayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
