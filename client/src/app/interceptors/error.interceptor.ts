import { NotyfService } from 'src/app/services/notyf.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notyf: NotyfService, private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = req.headers.set('No-Auth', 'True');
        const reqWithCredentials = req.clone({headers});
        return next.handle(reqWithCredentials)
            .pipe(
                catchError(error => {
                    if (error) {
                        switch (error.status) {
                            case 400:
                                if (error.error.errors) {
                                    const modalStateErrors = []
                                    for (const key in error.error.errors) {
                                        modalStateErrors.push(error.error.errors[key])
                                    }
                                    throw modalStateErrors
                                } else {
                                    this.notyf.error(error.status + ": " + error.statusText)
                                }
                                break;
                            case 401:
                                this.notyf.error(error.status + ": " + error.statusText)
                                break;
                            case 404:
                                this.router.navigateByUrl('not-found')
                                break;
                            case 500:
                                const navigationExtras: NavigationExtras = { state: { error: error.error } }
                                this.router.navigateByUrl('server-error', navigationExtras)
                                break;
                            default:
                                this.notyf.error("Something unexpected has happened...")
                                console.log(error)
                                break;
                        }
                        return throwError(error)
                    }
                })
            );
    }
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(req).pipe(catchError(error => {
    //         if (error) {
    //             switch (error.status) {
    //                 case 400:
    //                     if (error.error.errors) {
    //                         const modalStateErrors = []
    //                         for (const key in error.error.errors) {
    //                             modalStateErrors.push(error.error.errors[key])
    //                         }
    //                         throw modalStateErrors
    //                     } else {
    //                         this.notyf.error(error.status + ": " + error.statusText)
    //                     }
    //                     break;
    //                 case 401:
    //                     this.notyf.error(error.status + ": " + error.statusText)
    //                     break;
    //                 case 404:
    //                     this.router.navigateByUrl('not-found')
    //                     break;
    //                 case 500:
    //                     const navigationExtras: NavigationExtras = { state: { error: error.error } }
    //                     this.router.navigateByUrl('server-error', navigationExtras)
    //                     break;
    //                 default:
    //                     this.notyf.error("Something unexpected has happened...")
    //                     console.log(error)
    //                     break;
    //             }
    //             return throwError(error)
    //         }
    //     }));
    // }
}