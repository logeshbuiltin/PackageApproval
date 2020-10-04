import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuctnListComponent } from './skuctn-list.component';

describe('SkuctnListComponent', () => {
  let component: SkuctnListComponent;
  let fixture: ComponentFixture<SkuctnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuctnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuctnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
