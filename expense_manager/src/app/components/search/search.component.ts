import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ExpenseService } from 'src/app/services/expense.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories: any[] = []; // Replace with the type of your category object
  selectedCategoryId: number | null = null;
  expenses: any[] = []; // Replace with the type of your expense object
  constructor(private expenseService: ExpenseService, private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.loadCategories();
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

