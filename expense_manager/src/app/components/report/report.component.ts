import { Iexpense } from './../../interfaces/iexpense';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iincome } from 'src/app/interfaces/iincome';
import { ExpenseService } from 'src/app/services/expense.service';
import { IncomeService } from 'src/app/services/income.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent{
  @Input() income!: Iincome[];
  @Input() expense!: Iexpense[];

  categoryTotals: { [categoryId: number]: number } = {};

  constructor(private incomeService: IncomeService, private route: ActivatedRoute, private expenseService: ExpenseService) {
    expenseService.getExpense().subscribe({
      next: (results) => {
        this.expense = results;
        this.calculateCategoryTotals();
      },
      error: (err) => {
        console.log(err);
      }
    });
    incomeService.getIncome().subscribe({
      next: (results) => {
        this.income = results;
        this.calculateCategoryTotals();
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

  getCategoryName(categoryId: number): string {
    const category = this.expense.find(expense => expense.cate_id === categoryId)?.category;
    return category ? category.cate_name : 'Unknown Category';
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
