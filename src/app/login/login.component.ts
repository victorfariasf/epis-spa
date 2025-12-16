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

    const payload = {
      "email": this.loginForm.get('email')?.value!,
      "senha": this.loginForm.get('password')?.value!
    }

    this.authService.authLogin(payload).subscribe({
      next: (rsp) => {
        localStorage.setItem('usuario', rsp.nome);
        localStorage.setItem('email', rsp.email);
        localStorage.setItem('senha', rsp.senha);
        localStorage.setItem('logado', "true");
        localStorage.setItem('usuarioLogado',rsp.id);
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Email ou senha inválidos';
      }
    })

  }

  esqueciSenha() {
    this.router.navigateByUrl('/auth/esqueci-senha');
  }

  registrarConta() {
    this.router.navigateByUrl('/auth/register');
  }
}
