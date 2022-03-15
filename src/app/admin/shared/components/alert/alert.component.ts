import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertServices} from '../../services/alert.services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 2000;
  public text: string | undefined;
  public type = 'success';
  alertSub: Subscription | undefined;
  constructor(private alertService: AlertServices) { }

  ngOnInit(): void {
   this.alertSub =  this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    });
  }
  ngOnDestroy(): void {
    if (this.alertSub){
      this.alertSub.unsubscribe();
    }
  }

}
