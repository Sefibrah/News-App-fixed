import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { NotyfService } from '../services/notyf.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AccountService, private notyf: NotyfService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accountService.getToken() == null) {
      this.notyf.error("You are not logged in to see that page.")
      this.router.navigate([''])
      return false
    }
    const role: string = this.accountService.decodedToken().role
    if(role == "Admin")
      return true
    this.notyf.error("You are not authorized to see that page.")
    this.router.navigate([''])
    return false
  }
  
}
