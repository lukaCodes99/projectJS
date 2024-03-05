import { Injectable } from '@angular/core';
import User from '../model/korisnikModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {}
  

  private apiUrl = 'http://localhost:5000/api';

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getUsers`);
  }

  getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/user/${id}`);
 }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addUser`, user);
  }



}