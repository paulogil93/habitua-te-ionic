import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEventsPage } from './show-events.page';

describe('ShowEventsPage', () => {
  let component: ShowEventsPage;
  let fixture: ComponentFixture<ShowEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
