import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Credenciais } from '../../models/credenciais';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule, HttpHeaderResponse } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { timeout } from 'rxjs';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';


@Component({ 
  standalone: true,
  imports:[MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIcon
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})


export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: '',
  }
  email = new FormControl('',[Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private toastr: ToastrService, private service: AuthService, private router: Router ) {
  }
  ngOnInit(): void {
  }

  validaCampos(): boolean{
    return this.email.valid && this.senha.valid
  }

  logar(){
    this.service.authenticate(this.creds).subscribe(resposta => {
      this.service.successfulLogin(resposta.headers.get('Authorization').substring(7));
      this.router.navigate(['']);
    },() =>{
      this.toastr.error('Usuário e/ou senha inválido');
    });
  }

}
