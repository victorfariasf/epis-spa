import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  entrar() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.get('email')?.value!;
    const password = this.loginForm.get('password')?.value!;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/main');
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Email ou senha inválidos';
      }
    });
  }

  esqueciSenha() {
    // this.router.navigateByUrl('/auth/esqueci-senha');
  }

  registrarConta() {
    this.router.navigateByUrl('/auth/register');
  }
}
