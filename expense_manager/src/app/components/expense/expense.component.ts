import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iexpense } from 'src/app/interfaces/iexpense';
import { Iincome } from 'src/app/interfaces/iincome';
import { ExpenseService } from 'src/app/services/expense.service';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {
  @Input() expense!: Iexpense[];
  @Input() income!: Iincome[];
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
  deleteExpense(expenseId: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(expenseId).subscribe(
        () => {
          console.log('Expense deleted successfully');
          // Update the expenses list after deletion
          this.expense = this.expense.filter(expense => expense.id !== expenseId);
        },
        (error) => {
          console.error('Error deleting expense', error);
        }
      );
    }
  }
  deleteIncome(incomeId: number): void {
    if (confirm('Are you sure you want to delete this income?')) {
      this.incomeService.deleteIncome(incomeId).subscribe(
        () => {
          console.log('Income deleted successfully');
          // Update the incomes list after deletion
          this.income = this.income.filter(expense => expense.id !== incomeId);
        },
        (error) => {
          console.error('Error deleting income', error);
        }
      );
    }
  }
}
