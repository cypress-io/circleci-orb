import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdButtonComponent } from './third-button.component';

describe('ThirdButtonComponent', () => {
  let component: ThirdButtonComponent;
  let fixture: ComponentFixture<ThirdButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
