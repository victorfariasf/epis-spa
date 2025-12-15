import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = new FormGroup({
    nome: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    senha: new FormControl("", Validators.required)
  });

  constructor(private register: RegisterService) { }

  ngOnInit(): void {
  }

  fazerRegistro(){
    const registerPayload = {
      "name": this.registerForm.get('nome')?.value,
      "email": this.registerForm.get('email')?.value,
      "senha": this.registerForm.get('senha')?.value
    }

    this.register.register(registerPayload).subscribe({
      next: (rsp) => {
        console.log("Registro feito com sucesso");
      },
      error: (err) => {
        console.log("Erro ao concluir registro");
      }
    }
    )
  }


}
