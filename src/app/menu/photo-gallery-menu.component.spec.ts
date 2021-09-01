import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGalleryMenuComponent } from './photo-gallery-menu.component';

describe('PhotoGalleryComponent', () => {
  let component: PhotoGalleryMenuComponent;
  let fixture: ComponentFixture<PhotoGalleryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoGalleryMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGalleryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
