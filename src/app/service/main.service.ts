import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Kategorija from '../model/kategorijaModel';
import Vijest from '../model/vijestiModel';
import Komentar from '../model/komentarModel';
import User from '../model/korisnikModel';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5000/api';

  getCategories(): Observable<Kategorija[]> {
    return this.http.get<Kategorija[]>(`${this.apiUrl}/categories`);
  }

  getCategoryNews(id: number): Observable<Vijest[]> {
    return this.http.get<Vijest[]>(`${this.apiUrl}/category/${id}`);
  }

  getAllNews(): Observable<Vijest[]> {
    return this.http.get<Vijest[]>(`${this.apiUrl}/news`);
  }

  getPost(id: number): Observable<Vijest[]> {
    return this.http.get<Vijest[]>(`${this.apiUrl}/post/${id}`);
  }
  
  getCommentsByPostId(id: number): Observable<Komentar[]> {
    return this.http.get<Komentar[]>(`${this.apiUrl}/commentsByPostId/${id}`);
  }

  postComment(comment: Komentar): Observable<Komentar> {
    return this.http.post<Komentar>(`${this.apiUrl}/comments`, comment);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getUsers`);
  }

  changeUserRole(username: string, role: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/changeUserRole`, { username, role });
  }

  addPost(post: Vijest): Observable<Vijest> {
    return this.http.post<Vijest>(`${this.apiUrl}/addVijest`, post);
  }

  updatePost(id: number, text: string): Observable<Vijest> {
    return this.http.put<Vijest>(`${this.apiUrl}/updatePost/${id}`, { text });
  }

  deletePost(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/deletePost/${id}`);
  }
  
}