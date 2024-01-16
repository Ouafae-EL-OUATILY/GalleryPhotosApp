import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripteursComponent } from './descripteurs.component';

describe('DescripteursComponent', () => {
  let component: DescripteursComponent;
  let fixture: ComponentFixture<DescripteursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescripteursComponent]
    });
    fixture = TestBed.createComponent(DescripteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
