import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthButtonComponent } from './fourth-button.component';

describe('FourthButtonComponent', () => {
  let component: FourthButtonComponent;
  let fixture: ComponentFixture<FourthButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
