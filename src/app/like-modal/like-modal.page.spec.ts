import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeModalPage } from './like-modal.page';

describe('LikeModalPage', () => {
  let component: LikeModalPage;
  let fixture: ComponentFixture<LikeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikeModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
