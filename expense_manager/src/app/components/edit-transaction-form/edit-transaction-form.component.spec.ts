import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionFormComponent } from './edit-transaction-form.component';

describe('EditTransactionFormComponent', () => {
  let component: EditTransactionFormComponent;
  let fixture: ComponentFixture<EditTransactionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTransactionFormComponent]
    });
    fixture = TestBed.createComponent(EditTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
