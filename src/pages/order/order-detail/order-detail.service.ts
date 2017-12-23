import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SITE_HOST_URL } from "../../../shared/config/env.config";

@Injectable()
export class OrderDetailService {
    constructor(private authHttp: AuthHttp) { }
    getSellerOrderDtl(id) {
        return this.authHttp.get(`${SITE_HOST_URL}sellerorder/`+id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}