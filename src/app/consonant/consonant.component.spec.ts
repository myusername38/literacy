import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsonantComponent } from './consonant.component';

describe('ConsonantComponent', () => {
  let component: ConsonantComponent;
  let fixture: ComponentFixture<ConsonantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsonantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsonantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
