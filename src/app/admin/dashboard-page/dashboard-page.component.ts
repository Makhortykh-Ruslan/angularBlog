import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostServices} from '../../shared/post.services';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertServices} from '../shared/services/alert.services';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[]  = [];
  pSub: Subscription | any;
  dSub: Subscription | any;
  searchStr = '';

  constructor(private postService: PostServices, private alertService: AlertServices) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe(post => {
      this.posts = post;
    });
  }
  removePost(id: string): void {
    this.dSub = this.postService.removePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.danger('Пост был удален');
    });
  }
  ngOnDestroy(): void {
    if (this.pSub){
      this.pSub.unsubscribe();
    }
    if (this.dSub){
      this.dSub.unsubscribe();
    }
  }
}
