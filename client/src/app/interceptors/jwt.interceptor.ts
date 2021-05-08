import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (JSON.parse(localStorage.getItem("token")) != null) {
            let token: string = JSON.parse(localStorage.getItem("token")).token
            if (token != null) {
                // const headers = new HttpHeaders({
                //     'Authorization': `Bearer ${token}`,
                //     'Access-Control-Allow-Origin': '*',
                // });
                // const headers = req.headers.set({'Access-Control-Allow-Origin': '*'});
                const headers = req.headers.set('Authorization', `Bearer ${token}`);
                const authReq = req.clone({ headers });
                return next.handle(authReq);
            }
        } else {
            const headers = req.headers.set('Access-Control-Allow-Origin', '*');
            const authReq = req.clone({ headers });
            return next.handle(authReq);
        }
    }
}

