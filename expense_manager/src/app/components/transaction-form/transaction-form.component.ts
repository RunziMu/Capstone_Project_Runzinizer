import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { IncomeService } from 'src/app/services/income.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {
  transactionForm: FormGroup;
  // isEdit: boolean = false;
  // editId: number = 0;
  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private incomeService: IncomeService, private userService: UserService, private route: ActivatedRoute) {
    this.transactionForm = fb.group({
      user_id: ['1'],
      cate_id: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      expense_date: ['', [Validators.required]],
    });
    // let expenseId = route.snapshot.paramMap.get('expense_id');
    // console.log(expenseId);

    // Edit mode
    // if (expenseId !== null) {
    //   this.isEdit = true;
    //   this.editId = parseInt(expenseId);
    //   // Get task from DB and pre-populate form with the data
    //   expenseService.getTheExpense(this.editId).subscribe({
    //     next: (result) => {
    //       this.transactionForm.patchValue(result); // Populate form with task data
    //     }
    //   })
    // }
  }

  // onSubmit() {
  //   console.log(this.transactionForm.value);
  //   if (this.isEdit) {
  //     this.editExpense();
  //   } else {
  //     this.createExpense();
  //   }
  // }

  onSubmit() {
    this.createExpense();
  }

  createExpense() {
    this.expenseService.createExpense(this.transactionForm.value).subscribe({
      next: (result) => {
        alert('New expense was created successfully');
        this.transactionForm.reset();
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
        alert('Something went wrong');
      }
    });
  }

  // editExpense() {
  //   this.expenseService.updateExpense(this.transactionForm.value, this.editId).subscribe({
  //     next: (result) => {
  //       alert('Task was updated successfully');
  //       this.transactionForm;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       alert('Something went wrong');
  //     }
  //   });
  // }
}

