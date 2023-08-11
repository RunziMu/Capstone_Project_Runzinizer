import { Iexpense } from './../../interfaces/iexpense';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iincome } from 'src/app/interfaces/iincome';
import { ExpenseService } from 'src/app/services/expense.service';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  @Input() income!: Iincome[];
  @Input() expense!: Iexpense[];
  constructor(private incomeService: IncomeService, private route: ActivatedRoute, private expenseService: ExpenseService) {
    expenseService.getExpense().subscribe({
      next: (results) => {
        this.expense = results;
      },
      error: (err) => {
        console.log(err);
      }
    });
    incomeService.getIncome().subscribe({
      next: (results) => {
        this.income = results;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  calculateIncomeTotal(): number {
    return this.income.reduce((total, item) => total + item.amount, 0);
  }
  calculateExpenseTotal(): number {
    return this.expense.reduce((total, item) => total + item.amount, 0);
  }
  calculateBalance(): number {
    return this.income.reduce((total, item) => total + item.amount, 0) - this.expense.reduce((total, item) => total + item.amount, 0);
  }
}
