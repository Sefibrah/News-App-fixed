import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { NotyfService } from 'src/app/services/notyf.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router, private notyf: NotyfService) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    this.accountService.register(form.form.value).subscribe((r: any) => {
      form.resetForm()
      this.notyf.success("Registered successfuly, now go ahead and login.")
      this.router.navigate(['login'])
    }, err => {
      form.resetForm()
      console.log(err)
    })
  }

}
