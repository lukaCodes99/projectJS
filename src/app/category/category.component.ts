import { Component } from '@angular/core';
import Vijest from '../model/vijestiModel';
import { MainService } from '../service/main.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
news: Vijest[] = [];

private routeSub: Subscription = EMPTY.subscribe();

constructor(private mainService: MainService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.getCategoryNews(params['id']);
    });
    const id = + this.route.snapshot.paramMap.get('id')!;
    if (id !== null) {
      this.getCategoryNews(id);
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getCategoryNews(id: number) {
    this.mainService.getCategoryNews(id).subscribe(data => {
      console.log(data);
      this.news = data;
    }, error => {
      console.error(error);
    });
  }

  onPostClick(id: number) {
    this.router.navigate(['/post', id]);
  }

}
