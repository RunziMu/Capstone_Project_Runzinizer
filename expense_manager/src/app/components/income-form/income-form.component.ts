import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IncomeService } from 'src/app/services/income.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent {
  incomeForm: FormGroup;
  constructor(private fb: FormBuilder, private incomeService: IncomeService, private userService: UserService, private route: ActivatedRoute) {
    this.incomeForm = fb.group({
      user_id: ['1'],
      cate_id: ['13', [Validators.required]],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      income_date: ['', [Validators.required]],
    })
   }
   onSubmit(){
    this.createIncome();
   }
   createIncome(){
    this.incomeService.createIncome(this.incomeForm.value).subscribe({
      next: (result) => {
        alert('New income was created successfully');
        this.incomeForm.reset();
      },
      error: (err) => {
        console.log(err);
        alert('Something went wrong');
      }
    })
   }
}
