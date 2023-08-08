import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icategory } from '../interfaces/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getCategories() {
    return this.http.get<Icategory[]>('http://localhost:3000/category');
  }
}
