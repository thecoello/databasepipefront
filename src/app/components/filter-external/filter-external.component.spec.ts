import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterExternalComponent } from './filter-external.component';

describe('FilterExternalComponent', () => {
  let component: FilterExternalComponent;
  let fixture: ComponentFixture<FilterExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterExternalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
