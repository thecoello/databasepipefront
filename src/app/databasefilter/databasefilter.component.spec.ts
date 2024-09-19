import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasefilterComponent } from './databasefilter.component';

describe('DatabasefilterComponent', () => {
  let component: DatabasefilterComponent;
  let fixture: ComponentFixture<DatabasefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabasefilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatabasefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
