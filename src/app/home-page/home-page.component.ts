import { Component, OnInit } from '@angular/core';
import {PostServices} from '../shared/post.services';
import {Observable} from 'rxjs';
import {Post} from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts$: Observable<Post[]> | undefined;
  constructor(private postService: PostServices) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getAll();
  }

}
