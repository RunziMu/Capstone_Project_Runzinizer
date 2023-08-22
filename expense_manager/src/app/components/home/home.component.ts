import { ExpenseService } from 'src/app/services/expense.service';
import { Iexpense } from './../../interfaces/iexpense';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iincome } from 'src/app/interfaces/iincome';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() expense!: Iexpense[];
  @Input() income!: Iincome[];
  isLargeScreen = true;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isLargeScreen = window.innerWidth > 768;
  }
  constructor(private expenseService: ExpenseService, private route: ActivatedRoute, private incomeService: IncomeService) {
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
  calculateExpenseTotal(): number {
    return this.expense.reduce((total, item) => total + item.amount, 0);
  }
  calculateIncomeTotal(): number {
    return this.income.reduce((total, item) => total + item.amount, 0);
  }
  calculateBalance(): number {
    return this.income.reduce((total, item) => total + item.amount, 0) - this.expense.reduce((total, item) => total + item.amount, 0);
  }

  calculateCategoryTotals(): { category: number; totalExpense: number }[] {
    const categoryTotals: { category: number; totalExpense: number }[] = [];
    const uniqueCategories = Array.from(new Set(this.expense.map((item) => item.cate_id)));

    uniqueCategories.forEach((category) => {
      const categoryExpenses = this.expense.filter((item) => item.cate_id === category);
      const totalExpense = categoryExpenses.reduce((total, item) => total + item.amount, 0);
      categoryTotals.push({ category, totalExpense });
    });
    return categoryTotals;
  }
}
