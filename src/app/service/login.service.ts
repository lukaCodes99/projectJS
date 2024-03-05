import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import User from '../model/korisnikModel';
import { Injectable } from '@angular/core';


@Injectable()
export class LoginService{

    constructor(private http: HttpClient) {}

    private apiUrl = 'http://localhost:5000/api';


    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/getUsers`);
    }

    getUser(id: number): Observable<User> {
            return this.http.get<User>(`${this.apiUrl}/user/${id}`);
    }

    authenticateUser(username: string, password: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/authenticateUser`, {
            params: {
                username: username,
                password: password
            }
        });
    }

    changeUserRole(username: string, role: string): Observable<any> {
        return this.http.put('/api/changeUserRole', {username, role});
    }

}