import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Kategorija from '../model/kategorijaModel';
import { MainService } from '../service/main.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  categories: Kategorija[] = [];

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  currentUsername(): Observable<string> {
    return new Observable<string>((observer) => {
      const user = JSON.parse(localStorage.getItem('currentUser') as string);
      
      observer.next(user ? user[0].username : '');
    });
  }

  isAdmin(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const user = JSON.parse(localStorage.getItem('currentUser') as string);
      observer.next(user ? user[0].role === 'admin' : false);
    });
  }

  isAuthor(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const user = JSON.parse(localStorage.getItem('currentUser') as string);
      observer.next(user ? user[0].role === 'author' : false);
    });
  }
  
  getCategories() {
    this.mainService.getCategories().subscribe((data: Kategorija[]) => {
      this.categories = data;
    }, (error: any) => {
      console.error(error);
    });
  }

  onCategoryClick(id: number) {
    if (id) {
      this.router.navigate(['/category', id]);
    } else {
      console.log(this.categories)
      console.error('Category ID is undefined');
    }
  }

  onTitleClick() {
    this.router.navigate(['/main']);
  }

  onLogout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);;
  }

  onAdminClick(): void {
    this.router.navigate(['/administracija']);
  }

  onAuthorClick(): void {
    this.router.navigate(['/administracija']);
  }

}