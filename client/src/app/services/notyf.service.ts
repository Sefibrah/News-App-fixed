import { Inject, Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import { NOTYF } from './../shared/utils/notyf.token';

@Injectable({
  providedIn: 'root'
})
export class NotyfService {

  constructor(@Inject(NOTYF) private notyf: Notyf) { }

  success(message: string) {
    this.notyf.success(message)
  }

  error(message: string) {
    this.notyf.error(message)
  }
}
