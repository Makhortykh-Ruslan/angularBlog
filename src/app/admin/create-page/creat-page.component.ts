import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import {PostServices} from '../../shared/post.services';
import {AlertServices} from '../shared/services/alert.services';

@Component({
  selector: 'app-create-page',
  templateUrl: './creat-page.component.html',
  styleUrls: ['./creat-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    author: new FormControl(null, [Validators.required]),
    text: new FormControl(null, [Validators.required])
  });

  constructor(private postService: PostServices, private alertService: AlertServices) { }

  ngOnInit(): void {
  }
  onSubmit(): void{
    if (this.form.invalid) { return; }
    const post: Post = {...this.form.value, date: new Date()};
    this.postService.create(post).subscribe((res) => {
      this.form.reset()
      this.alertService.success('Пост был создан')
    })
  }

}
