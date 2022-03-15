import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  submitted = false;
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });
  public message: string | undefined;
  constructor(public authService: AuthService, private router: Router, private activeRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRout.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']){
        this.message = 'Введите данные снова!';
      }else if (params['authError']){
        this.message = 'Сесия истекла введите данные заново';
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const user: User = {...this.form.value};
    this.submitted = true;
    this.authService.login(user).subscribe(res => {
      this.form.reset();
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard']);
    }, () => {
      this.submitted = false;
    });
  }
}
