import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Credenciais } from '../../models/credenciais';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({ 
  standalone: true,
  imports:[MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
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

  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {
  }

  validaCampos(): boolean{
    if(this.email.valid && this.senha.valid){
      return true;
    }else{
      return false;
    }
  }
  logar(){
    this.toastr.success('Login','Teste',{timeOut: 5000, closeButton: true, progressBar: true})
    this.creds.senha =''
  }

}
