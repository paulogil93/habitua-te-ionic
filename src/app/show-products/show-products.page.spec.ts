import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductsPage } from './show-products.page';

describe('ShowProductsPage', () => {
  let component: ShowProductsPage;
  let fixture: ComponentFixture<ShowProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
