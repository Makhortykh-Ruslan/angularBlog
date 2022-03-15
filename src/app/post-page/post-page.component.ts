import { Component, OnInit } from '@angular/core';
import {PostServices} from '../shared/post.services';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {Post} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post> | undefined;

  constructor(private postService: PostServices, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.post$ = this.router.params.pipe(
        switchMap((params: Params) => {
          return this.postService.getBuId(params['id']);
        })
    );
  }

}
