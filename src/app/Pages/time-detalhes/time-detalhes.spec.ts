import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDetalhes } from './time-detalhes';

describe('TimeDetalhes', () => {
  let component: TimeDetalhes;
  let fixture: ComponentFixture<TimeDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeDetalhes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeDetalhes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
