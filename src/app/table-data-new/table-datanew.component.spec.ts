import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataNewComponent } from './table-datanew.component';

describe('TableDataComponent', () => {
  let component: TableDataNewComponent;
  let fixture: ComponentFixture<TableDataNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDataNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDataNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
