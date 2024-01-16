import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomImageComponent } from './custom-image.component';

describe('CustomImageComponent', () => {
  let component: CustomImageComponent;
  let fixture: ComponentFixture<CustomImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomImageComponent]
    });
    fixture = TestBed.createComponent(CustomImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
