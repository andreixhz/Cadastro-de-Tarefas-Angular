import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;

  formRegister: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleCreate() {
    const { username, email, password } = this.formRegister.value;

    this.loading = true;
    this.authService.register(
      username,
      email,
      password
    ).subscribe(
      (res: any) => {
        localStorage.setItem("token", res.token);
        this.router.navigate(['/'])
      },
      () => { },
      () => { this.loading = false; }
    )

  }

}
