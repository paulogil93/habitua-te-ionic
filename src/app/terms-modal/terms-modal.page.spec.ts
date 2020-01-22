import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsModalPage } from './terms-modal.page';

describe('TermsModalPage', () => {
  let component: TermsModalPage;
  let fixture: ComponentFixture<TermsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
