import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent implements OnInit {
  

  public usuarios: any[] = [];
  public usuarioCompativel: any;
  public usuarioEncontrado: boolean = false;
  public page = 1;

  public emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public senhaForm = new FormGroup({
    senha: new FormControl('', [Validators.required]),
  });

  constructor(private usuario: UsuarioService) { }

  ngOnInit(): void {
  }

  enviarEmail(){
    this.usuario.listarUsuarios().subscribe({
      next: (rsp) => {
        this.usuarios = rsp;
        this.usuarioCompativel = this.usuarios.find(u => {
          if(u.email === this.emailForm.get('email')?.value)
            return u;
        })
        if(this.usuarioCompativel === undefined || this.usuarioCompativel === null){
          this.usuarioEncontrado = false;
        }else{
          this.page = 2
        }
      },
      error: (err) => {
      }
    })
  }

  mudarSenha(){
    
    const payload = {
      "senha": this.senhaForm.get('senha')?.value
    }
    this.usuario.editarUsuaio(this.usuarioCompativel.id.toString(), payload).subscribe({
      next: (rsp) => {
        this.page = 3
      },
      error: (err) => {

      }
    })
  }

}
