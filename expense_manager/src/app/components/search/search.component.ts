import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ExpenseService } from 'src/app/services/expense.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories: any[] = []; // Replace with the type of your category object
  selectedCategoryId: number | null = null;
  expenses: any[] = []; // Replace with the type of your expense object
  constructor(private expenseService: ExpenseService, private categoryService: CategoryService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.loadCategories();
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId');
      if (categoryId) {
        this.selectedCategoryId = +categoryId;
        this.loadExpensesForCategory(this.selectedCategoryId);
      }
    });
  }

  loadExpensesForCategory(categoryId: number): void {
    this.expenseService.getExpensesByCategoryId(categoryId).subscribe(
      (data: any) => {
        this.expenses = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  onFilterSubmit(): void {
    if (this.selectedCategoryId === null) {
      this.expenses = [];
      return;
    }
    this.expenseService.getExpensesByCategoryId(this.selectedCategoryId).subscribe(
      (data: any) => {
        this.expenses = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  calculateTotalAmount(): number {
    let totalAmount = 0;
    for (const expense of this.expenses) {
      totalAmount += expense.amount;
    }
    return totalAmount;
  }
}

