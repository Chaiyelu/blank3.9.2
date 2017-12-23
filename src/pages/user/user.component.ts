import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from "../../shared/domain/state";
import { Auth } from "../../shared/models/auth.model";
import { UserModel } from "../../shared/models/user.model";

import { PerinfoComponent } from "./perinfo/perinfo.component";
import { LoginpageComponent } from "../../shared/components/loginpage/loginpage.component";
import { SetComponent } from "./set/set.component";
import { CollectComponent } from "./collect/collect.component";

import { UserService } from "./user.service";

@Component({
  selector: 'user',
  templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
  auth: Observable<Auth>;
  userInfo: UserModel;
  isLogin: boolean;
  constructor(
    public navCtrl: NavController,
    public store$: Store<AppState>,
    public modalCtrl: ModalController,
    public userService: UserService
  ) {
    this.auth = this.store$.select('auth');
    this.auth.subscribe((auth) => {
      this.isLogin = auth.isLogin;
      console.log('111');
      if (auth.isLogin) {
        this.userInfo = auth.user;
      } else {
        this.userInfo = <UserModel>{};
      }
    });
  }

  ngOnInit() { }

  goToPerInfo() {
    if (this.isLogin) {
      this.navCtrl.push(PerinfoComponent, this.userInfo.id);
    } else {
      let LoginModal = this.modalCtrl.create(LoginpageComponent);
      LoginModal.present();
    }

  }

  ionViewDidEnter() {
    this.userService.isLoggedIn();
  }

  goToSet() {
    if (this.isLogin) {
      this.navCtrl.push(SetComponent, this.userInfo.id);
    } else {
      let LoginModal = this.modalCtrl.create(LoginpageComponent);
      LoginModal.present();
      LoginModal.onDidDismiss(()=>{
        if (this.isLogin) {
          this.navCtrl.push(SetComponent, this.userInfo.id);
        }
      });
    }
  }

  goToCollect() {
    if (this.isLogin) {
      this.navCtrl.push(CollectComponent, this.userInfo.id);
    } else {
      let LoginModal = this.modalCtrl.create(LoginpageComponent);
      LoginModal.present();
      LoginModal.onDidDismiss(()=>{
        if (this.isLogin) {
          this.navCtrl.push(CollectComponent, this.userInfo.id);
        }
      });
    }
  }

  onScroll($event) {

  }

  uploadImage() {
    
  }
}
