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
export class ReportComponent {
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

  calculatePercentage(totalExpense: number): number {
    const total = this.calculateExpenseTotal();
    if (total === 0) {
      return 0;
    }
    return (totalExpense / total) * 100;
  }

  isHighestPercentage(index: number): boolean {
    const percentages = this.calculateCategoryTotals().map(categoryTotal =>
      this.calculatePercentage(categoryTotal.totalExpense)
    );
    const highestPercentage = Math.max(...percentages);

    return percentages[index] === highestPercentage;
  }

  getInsightsAndSuggestions(): string {
    const totalExpense = this.calculateExpenseTotal();
    const totalIncome = this.calculateIncomeTotal();
    const balance = this.calculateBalance();
    const highestPercentage = Math.max(...this.calculateCategoryTotals().map(categoryTotal =>
      this.calculatePercentage(categoryTotal.totalExpense)
    ));

    let insights = "";

    if (balance > 0) {
      insights += "Congratulations! You have a positive balance, which means you're managing your finances well. ";
    } else if (balance < 0) {
      insights += "Your expenses have exceeded your income. It's important to review your spending habits and consider making adjustments. ";
    } else {
      insights += "Your expenses are in line with your income. Keep monitoring your financial situation to ensure it stays balanced. ";
    }

    if (highestPercentage > 0) {
      insights += `Your highest expense category is <strong class="highlighted-category">${this.getCategoryName(this.findCategoryWithHighestExpense())} (${highestPercentage.toFixed(0)}%)</strong>. Consider reviewing your spending in this category.`;
    }

    return insights;
  }

  findCategoryWithHighestExpense(): number {
    let highestCategory = -1;
    let highestAmount = 0;

    this.calculateCategoryTotals().forEach(categoryTotal => {
      if (categoryTotal.totalExpense > highestAmount) {
        highestAmount = categoryTotal.totalExpense;
        highestCategory = categoryTotal.category;
      }
    });

    return highestCategory;
  }

}
