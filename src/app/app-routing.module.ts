import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { CategoryComponent } from './category/category.component';
import { PostComponent } from './post/post.component';
import { AdministracijaComponent } from './administracija/administracija.component';

const routes: Routes = [
  { path : 'login', component: LoginComponent },
  { path : 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path : 'main', component: MainComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'post/:id', component: PostComponent},
  { path: 'administracija', component: AdministracijaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
