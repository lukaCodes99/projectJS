import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, EMPTY, Observable } from 'rxjs';
import Vijest from '../model/vijestiModel';
import { MainService } from '../service/main.service';
import Komentar from '../model/komentarModel';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  
  private routeSub: Subscription = EMPTY.subscribe();
  post: Vijest[]= [];
  comments: Komentar[] = [];

  constructor(private mainService: MainService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.getPost(params['id']);
      this.getComments(params['id']);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getPost(id: number) {
    this.mainService.getPost(id).subscribe(data => {
      console.log(data);
      this.post = data;
    }, error => {
      console.error(error);
    });
  }

  getComments(id: number) {
    this.mainService.getCommentsByPostId(id).subscribe(data => {
      console.log(data);
      this.comments = data;
    }, error => {
      console.error(error);
    });
  }

  postComment(text: string) {

    const comment: Komentar = {
      idkomentari: 0,
      text,
      idvijest: this.post[0].idvijesti,
      
      idkorisnik: this.currentUserId(), // hardcoded user id
      timestamp: new Date().toISOString(),
    };
  
    this.mainService.postComment(comment).subscribe(() => {
      this.getComments(this.post[0].idvijesti);
    }, error => {
      console.error(error);
    });
  }

  currentUserId(): number {
    const user = JSON.parse(localStorage.getItem('currentUser') as string);
    console.log(user[0].idkorisnici + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    return user ? user[0].idkorisnici : 0;
  }

  isAuthor(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const user = JSON.parse(localStorage.getItem('currentUser') as string);
      observer.next(user ? user[0].idkorisnici === this.post[0].idkorisnik : false);
    });
  }

  updatePost(id: number) {
    // You can add a dialog or another way to get the new text for the post
    const newText = prompt("Enter new text for the post");
    if (newText) {
        this.mainService.updatePost(id, newText).subscribe(() => {
            // Refresh the post after updating
            this.getPost(id);
        }, error => {
            console.error(error);
        });
    }
}

deletePost(id: number) {
    this.mainService.deletePost(id).subscribe(() => {
        // Refresh the post after deleting
        this.getPost(id);
    }, error => {
        console.error(error);
    });
}
  
}
