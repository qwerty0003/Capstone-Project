import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VieniATrovarciComponent } from './vieni-atrovarci.component';

describe('VieniATrovarciComponent', () => {
  let component: VieniATrovarciComponent;
  let fixture: ComponentFixture<VieniATrovarciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VieniATrovarciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VieniATrovarciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
