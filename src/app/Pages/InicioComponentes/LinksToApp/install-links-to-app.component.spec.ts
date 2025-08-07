import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallLinksToAppComponent } from './install-links-to-app.component';

describe('InstallLinksToAppComponent', () => {
  let component: InstallLinksToAppComponent;
  let fixture: ComponentFixture<InstallLinksToAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallLinksToAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstallLinksToAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
