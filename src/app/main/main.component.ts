import { Component, OnInit } from '@angular/core';
import Kategorija from '../model/kategorijaModel';
import Vijest from '../model/vijestiModel';
import { MainService } from '../service/main.service'; // import the service
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categories: Kategorija[] = [];
  news: Vijest[] = [];

  constructor(private mainService: MainService, private router: Router) { } // inject the service
  
  ngOnInit() {
    this.getCategories();
    this.getAllNews();
  }

  getCategories() {
    this.mainService.getCategories().subscribe((data: Kategorija[]) => {
      this.categories = data;
    }, (error: any) => {
      console.error(error);
    });
  }

  getAllNews() {
    this.mainService.getAllNews().subscribe((data: Vijest[]) => {
      this.news = data;
    }, (error: any) => {
      console.error(error);
    });
  }

  onCategoryClick(id: number) {
    this.router.navigate(['/category', id]);
  }

  onPostClick(id: number) {
    this.router.navigate(['/post', id]);
  }

}