import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iincome } from 'src/app/interfaces/iincome';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent {
  @Input() income!: Iincome[];
  constructor(private incomeService: IncomeService, private route: ActivatedRoute) {
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
