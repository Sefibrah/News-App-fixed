import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { NotyfService } from 'src/app/services/notyf.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router, private notyf: NotyfService) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    this.accountService.login(form.form.value).subscribe((r: any) => {
      this.accountService.user$.next(r)
      console.log(r)
      console.log(JSON.stringify({ token: r.token, email: r.email }))
      localStorage.setItem("token", JSON.stringify({ token: r.token, email: r.email }))
      this.notyf.success("Logined successfuly, welcome.")
      form.resetForm()
      this.router.navigate([''])
    }, err => {
      console.log(err)
      form.resetForm()
    })
  }

}
