import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iexpense } from '../interfaces/iexpense';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  getExpense() {
    return this.http.get<Iexpense[]>('http://localhost:3000/expense');
  }
  getTheExpense(expenseId: number){
    return this.http.get<Iexpense>(`http://localhost:3000/expense/${expenseId}`);
  }
  createExpense(formData: any) {
    return this.http.post<Iexpense>('http://localhost:3000/expense', formData);
  }
  updateExpense(formData: any, expenseId: number) {
    return this.http.put<Iexpense>(`http://localhost:3000/expense/${expenseId}`, formData);
  }
  getExpensesByCategoryId(categoryId: number): Observable<Iexpense[]> {
    const url = `${this.apiUrl}/expense/filter?cate_id=${categoryId}`;
    return this.http.get<Iexpense[]>(url);
  }
}
