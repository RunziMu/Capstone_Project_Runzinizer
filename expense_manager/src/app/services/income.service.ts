import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iincome } from '../interfaces/iincome';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }
  getIncome() {
    return this.http.get<Iincome[]>('http://localhost:3000/income');
  }
  createIncome(formData: any) {
    return this.http.post<Iincome>('http://localhost:3000/income', formData)
  }
}
