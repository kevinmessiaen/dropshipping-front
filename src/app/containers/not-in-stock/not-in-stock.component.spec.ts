import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotInStockComponent } from './not-in-stock.component';

describe('NotInStockComponent', () => {
  let component: NotInStockComponent;
  let fixture: ComponentFixture<NotInStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotInStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotInStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
