import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  authenticate(username: string, password: string) {
    return this.httpClient.post(environment.path + "auth", { username, password });
  }

  register(username: string, email: string, password: string) {
    return this.httpClient.post(environment.path + "auth/create", { username, password, email });
  }


}
