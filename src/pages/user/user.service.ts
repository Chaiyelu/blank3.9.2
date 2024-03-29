import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Storage } from "@ionic/storage";
import { Store } from '@ngrx/store';
import { AppState } from "../../shared/domain/state";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SITE_HOST_URL } from "../../shared/config/env.config";
import { UserModel } from "../../shared/models/user.model";
import * as Auth from "../../shared/actions/auth.actions";

@Injectable()
export class UserService {

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private storage: Storage,
    private store$: Store<AppState>
  ) { }

  login(queryParams: Object) {
    let params = new URLSearchParams();
    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        params.append(key, queryParams[key]);
      }
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Observable((observer: Observer<any>) => {
      this.http.post(`${SITE_HOST_URL}auth`, '', { search: params }).subscribe(res => {
        let result = res.json();
        if (result && result.success) {
          if (result && result.token) {
            localStorage.setItem("token", result.token);
            this.store$.dispatch(new Auth.Login({
              user: result.user,
              isLogin: true,
              errMsg: null,
              redirectUrl: null
            }));
          }
        }
        observer.next(result);
        observer.complete();
      });
    });
  }

  register(mobile: string, code: string, password: string) {
    var body = { mobile: mobile, code: code, password: password };
    return new Observable((observer: Observer<any>) => {
      this.http.post(`${SITE_HOST_URL}users`, body).subscribe(res => {
        let result = res.json();
        if (result && result.success) {
          if (result && result.token) {
            localStorage.setItem("token", result.token);
            // this.storage.set("token", result.token);
            this.store$.dispatch(new Auth.Login({
              user: result.user,
              isLogin: true,
              errMsg: null,
              redirectUrl: null
            }));
          }
        }
        observer.next(result);
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      });
    });
  }

  logout(uid) {
    console.log('do logout');
    return Observable.create((observer: Observer<any>) => {
      localStorage.removeItem("token");
      this.store$.dispatch(new Auth.Logout());
      observer.next('logout');
      observer.complete();
    });
    //((observer: Observer<any>) => {
    // this.authHttp.post(`${SITE_HOST_URL}auth/logout`, { id: uid }).subscribe((res) => {
    //   //dispatch userInfo store
    //   this.store$.dispatch(new Auth.Logout());
    //   observer.next(res);
    //   observer.complete;
    // }, (err) => {
    //   observer.error(err);
    //   observer.complete();
    // });

    //});
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token==null) {
      this.store$.dispatch(new Auth.Logout());
    } else {
      if (!tokenNotExpired()) {
        this.store$.dispatch(new Auth.Logout());
      }
    }
  }

  checkMobileIsRegistered(mobile: string) {
    let params = new URLSearchParams();
    params.set('mobile', mobile);
    return this.http.get(`${SITE_HOST_URL}auth/checkmobileisreg`, { search: params })
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getUserInfo(id: number) {
    return this.authHttp.get(`${SITE_HOST_URL}users/` + id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  saveUserInfo(userInfo: Object) {
    return new Observable((observer: Observer<any>) => {
      this.authHttp.put(`${SITE_HOST_URL}users`, userInfo).subscribe((res) => {
        //dispatch userInfo store
        let updatedUserInfo = {};
        for (var key in userInfo) {
          if (userInfo.hasOwnProperty(key)) {
            updatedUserInfo[key] = userInfo[key];
          }
        }
        this.store$.dispatch(new Auth.UpdateUserinfo(updatedUserInfo));
        observer.next(res);
        observer.complete;
      }, (err) => {
        observer.error(err);
        observer.complete;
      });

    });
  }


}
