import { Component, OnInit } from '@angular/core';
import User from '../model/korisnikModel';
import { MainService } from '../service/main.service';
import { Observable } from 'rxjs';
import Vijest from '../model/vijestiModel';
import Kategorija from '../model/kategorijaModel';

@Component({
  selector: 'app-administracija',
  templateUrl: './administracija.component.html',
  styleUrls: ['./administracija.component.css']
})
export class AdministracijaComponent implements OnInit {
  users: User[] = [];
  categories: Kategorija[] = [];
  newVijest: Vijest = {
    idvijesti: 0,
    naslov: '',
    text: '',
    idkorisnik: 0,
    idkategorija: 0,
    timestamp: ''
  };

  constructor(private service: MainService) { }

  ngOnInit() {
    this.getUsers();
    this.service.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  currentUserId(): number {
    const user = JSON.parse(localStorage.getItem('currentUser') as string);
    console.log(user[0].idkorisnici + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    return user ? user[0].idkorisnici : 0;
  }


  getUsers() {
    this.service.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  changeUserRole(username: string, event: any) { // Change the type of event to 'any'
    const role = event.target.value || 'guest'; // Ensure target.value exists before accessing it
    this.service.changeUserRole(username, role).subscribe(() => {
      this.getUsers();
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



  onSubmit(): void {
  
    this.newVijest.idkorisnik = this.currentUserId();
    this.service.addPost(this.newVijest).subscribe(response => {
      console.log(response);
    });
  }

  getCategories() {
    this.service.getCategories().subscribe((data: Kategorija[]) => {
      this.categories = data;
    }, (error: any) => {
      console.error(error);
    });
  }


}
