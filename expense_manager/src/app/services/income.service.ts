import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iincome } from '../interfaces/iincome';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  getIncome() {
    return this.http.get<Iincome[]>('http://localhost:3000/income');
  }
  getTheIncome(incomeId: number){
    return this.http.get<Iincome>(`http://localhost:3000/incomes/${incomeId}`);
  }
  createIncome(formData: any) {
    return this.http.post<Iincome>('http://localhost:3000/income', formData)
  }
  updateIncome(formData: any, incomeId: number) {
    return this.http.put<Iincome>(`http://localhost:3000/income/${incomeId}`, formData);
  }
  deleteIncome(incomeId: number): Observable<void> {
    const url = `${this.apiUrl}/income/${incomeId}`;
    return this.http.delete<void>(url);
  }
}
