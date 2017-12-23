import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, ModalController, App } from 'ionic-angular';

import { Store } from '@ngrx/store';
import { AppState } from "../../shared/domain/state";
import { Auth } from "../../shared/models/auth.model";

import { OrderState } from "../../shared/models/order.model";
import { OrderPageComponent } from "./order-page/order-page.component";
import { LoginpageComponent } from "../../shared/components/loginpage/loginpage.component";
import { UserService } from "../user/user.service";

@Component({
  selector: 'page-order',
  templateUrl: 'order.component.html'
})
export class OrderComponent implements OnInit {
  auth: Observable<Auth>;
  orderHome: any;
  isLogin: boolean;
  constructor(
    public appCtrl: App,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public store$: Store<AppState>,
    public userService: UserService
  ) {
    this.auth = this.store$.select(appState => appState.auth);
    this.auth.map(auth => auth.isLogin).subscribe((isLogin) => {
      this.isLogin = isLogin;
    });

  }

  ngOnInit() {
    this.userService.isLoggedIn();
  }

  ionViewDidEnter() {
    this.userService.isLoggedIn();
  }

  doLogin() {
    let LoginModal = this.modalCtrl.create(LoginpageComponent);
    LoginModal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  directTo(state?: OrderState) {
    switch (state) {
      case OrderState.all:
        console.log('all');
        this.appCtrl.getRootNav().push(OrderPageComponent, { state: OrderState.all });
        break;
      case OrderState.waitPay:
        console.log('waitPay');
        this.appCtrl.getRootNav().push(OrderPageComponent, { state: OrderState.waitPay });
        break;
      case OrderState.waitUse:
        this.appCtrl.getRootNav().push(OrderPageComponent, { state: OrderState.waitUse });
        console.log('waitUse');
        break;
      case OrderState.waitRate:
        this.appCtrl.getRootNav().push(OrderPageComponent, { state: OrderState.waitRate });
        console.log('waitRate');
        break;
      case OrderState.other:
        this.appCtrl.getRootNav().push(OrderPageComponent, { state: OrderState.other });
        console.log('other');
        break;
      default:
        this.appCtrl.getRootNav().push(OrderPageComponent, { state: OrderState.all });
        break;
    }
  }

}
