import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';
import User from '../model/korisnikModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', Validators.required],
    repeatPassword: [''],
    email: ['', [Validators.required, Validators.email]]
  }, {validator: this.checkPasswords });


  users: User[] = [];
  formError: string | null = null;

  constructor(private fb: FormBuilder, private service: RegistrationService, private router: Router) { }

  ngOnInit(): void {}

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('repeatPassword')?.value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  // onSignup(): void {
  //   if (this.registerForm.valid) {
  //     this.service.addUser(this.registerForm.value);
      
  //     this.formError = 'uspješna registracija!';
  //     this.registerForm.reset();
  //   } else {
  //     this.formError = 'All fields need to be filled in.';
  //   }
  // }

  onSignup(): void {
    if (this.registerForm.valid) {
      this.service.addUser(this.registerForm.value).subscribe(
        response => {
          console.log(response);
          this.formError = 'Successful registration!';
          this.registerForm.reset();
          this.refreshUsers();
        },
        error => {
          console.error(error);
          this.formError = 'An error occurred during registration.';
        }
      );
    } else {
      this.formError = 'All fields need to be filled in.';
    }
  }

  refreshUsers() {
    this.service.getUsers().subscribe(data => {
      this.users = data as User[];
    })
  }
}