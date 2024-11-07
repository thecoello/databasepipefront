import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupcellComponent } from './popupcell.component';

describe('PopupcellComponent', () => {
  let component: PopupcellComponent;
  let fixture: ComponentFixture<PopupcellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupcellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupcellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
