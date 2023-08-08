import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  registerUser(formData: any) {
    return this.httpClient.post<Iuser>('http://localhost:3000/register', formData);
  }

  loginUser(formData: any) {
    return this.httpClient.post<Iuser>('http://localhost:3000/login', formData);
  }

  getUserData() {
    let data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null; //JSON.parse converts string to an object
  }

  // getUserProfile() {
  //   return this.httpClient.get<Iuser[]>('http://localhost:3000/user');
  // }

  isAuthenticated() {
    return (this.getUserData() !== null) ? true : false;
  }
}
