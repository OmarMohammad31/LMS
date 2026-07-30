import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestsComponent } from './list-requests.component';

describe('ListRequestsComponent', () => {
  let component: ListRequestsComponent;
  let fixture: ComponentFixture<ListRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRequestsComponent]
    });
    fixture = TestBed.createComponent(ListRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
