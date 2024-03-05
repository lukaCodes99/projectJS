import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import User from '../model/korisnikModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    loginObj: any = {
      username : '',
      password : ''
    };
    errorMessage: string = '';
    users:User[]=[];

    constructor(private service:LoginService, private router: Router) { }

    ngOnInit(): void {
      this.refreshUsers();
    }

    refreshUsers(){
      this.service.getUsers().subscribe(data=>{
        this.users = data as User[];
      })
    }

    // In LoginComponent
  onLogin(): void {
    this.service.authenticateUser(this.loginObj.username, this.loginObj.password).subscribe(
        data => {
            if (data === 'Korisnik ne postoji') {
                this.errorMessage = 'User does not exist.';
            } else if (data === 'Pogrešna lozinka') {
                this.errorMessage = 'Incorrect password.';
            } else {
                // The login was successful. The server should return the user data.
                // You can store this data in localStorage, for example.
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.router.navigate(['/main']); // navigate to the home page
            }
        },
        error => {
            this.errorMessage = 'An error occurred.';
        }
    );
  }

    onLogout(): void {
      localStorage.removeItem('currentUser'); // remove the user data from localStorage
      this.router.navigate(['/login']); // navigate to '/login' after logout
    }

}
