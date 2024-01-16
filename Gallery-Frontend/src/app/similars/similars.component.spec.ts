import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarsComponent } from './similars.component';

describe('SimilarsComponent', () => {
  let component: SimilarsComponent;
  let fixture: ComponentFixture<SimilarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarsComponent]
    });
    fixture = TestBed.createComponent(SimilarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
