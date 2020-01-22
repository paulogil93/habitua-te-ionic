import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendModalPage } from './attend-modal.page';

describe('AttendModalPage', () => {
  let component: AttendModalPage;
  let fixture: ComponentFixture<AttendModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
