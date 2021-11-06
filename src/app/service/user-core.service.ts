import { Injectable } from '@angular/core';
import { User } from '../entity/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserCoreService {

  user?: User

  constructor() { }

  getUser() {
    return this.user;
  }

  setUser(_user: User) {
    this.user = _user;
  }

}
