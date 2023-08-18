import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-edit-transaction-form',
  templateUrl: './edit-transaction-form.component.html',
  styleUrls: ['./edit-transaction-form.component.css']
})
export class EditTransactionFormComponent {
  editTransactionForm: FormGroup;
  editId: number = 0;
  
  constructor(private expenseService: ExpenseService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.editTransactionForm = fb.group({
      user_id: ['1'],
      cate_id: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      expense_date: ['', [Validators.required]],
    });
    let expenseId = route.snapshot.paramMap.get('expense_id');
    console.log(expenseId);
    if (expenseId !== null) {
      this.editId = parseInt(expenseId);
      expenseService.getTheExpense(this.editId).subscribe({
        next: (result) => {
          console.log(result);
          this.editTransactionForm.patchValue(result); // Populate data
        }
      })
    }
  }

  get expense_date() {
    return this.editTransactionForm.get('expense_date')!;
  }

  onSubmit() {
    console.log(this.editTransactionForm.value);
    this.editExpense();
  }

  editExpense() {
    this.expenseService.updateExpense(this.editTransactionForm.value, this.editId).subscribe({
      next: (result) => {
        alert('Expense was updated successfully');
        this.editTransactionForm;
      },
      error: (err) => {
        console.log(err);
        alert('Something went wrong');
      }
    });
  }
}
