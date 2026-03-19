import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Move } from './move';

describe('Move', () => {
  let component: Move;
  let fixture: ComponentFixture<Move>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Move]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Move);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
