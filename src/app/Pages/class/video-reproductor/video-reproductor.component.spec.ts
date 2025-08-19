import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoReproductorComponent } from './video-reproductor.component';

describe('VideoReproductorComponent', () => {
  let component: VideoReproductorComponent;
  let fixture: ComponentFixture<VideoReproductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoReproductorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoReproductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
