import { Component, OnInit } from '@angular/core';
import { Token } from './models/token.model';
import { User } from './models/user.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) { }
  
  ngOnInit() {
    if (this.accountService.getToken() != null) {
      const token: Token = this.accountService.decodedToken()
      const user: User = { username: token.unique_name, email: token.nameid, role: token.role }
      this.accountService.user$.next(user)
    }
  }
}
