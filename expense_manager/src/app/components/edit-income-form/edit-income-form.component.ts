import { IncomeService } from 'src/app/services/income.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-income-form',
  templateUrl: './edit-income-form.component.html',
  styleUrls: ['./edit-income-form.component.css']
})
export class EditIncomeFormComponent {
  editIncomeForm: FormGroup;
  eidtId: number = 0;
  constructor(private incomeService: IncomeService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.editIncomeForm = fb.group({
      user_id: ['1'],
      cate_id: ['13'],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      income_date: ['', [Validators.required]],
    });
    let incomeId = route.snapshot.paramMap.get('income_id');
    console.log(incomeId);
    if (incomeId !== null) {
      this.eidtId = parseInt(incomeId);
      incomeService.getTheIncome(this.eidtId).subscribe({
        next: (result) => {
          console.log(result);
          this.editIncomeForm.patchValue(result); // Populate data
        }
      })
    }
  }
  get income_date() {
    return this.editIncomeForm.get('income_date')!;
  }
  onSubmit() {
    console.log(this.editIncomeForm.value);
    this.editIncome();
  }
  editIncome() {
    this.incomeService.updateIncome(this.editIncomeForm.value, this.eidtId).subscribe({
      next: (result) => {
        alert('Income was updated successfully');
        this.editIncomeForm;
      },
      error: (err) => {
        console.log(err);
        alert('Something went wrong');
      }
    });
  }
}
