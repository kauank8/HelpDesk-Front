import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormControl, FormsModule, Validators} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatHint } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [MatCheckboxModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatIcon,
    MatHint,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.css'
})
export class ClienteCreateComponent {

cliente: Cliente = {
  id:'',
  nome:'',
  cpf:'',
  email:'',
  senha:'',
  perfis: [],
  dataCriacao:''
}  
nome: FormControl = new FormControl(null, Validators.minLength(3));
cpf: FormControl = new FormControl(null, Validators.required);
email: FormControl = new FormControl(null, Validators.email);
senha: FormControl = new FormControl(null, Validators.minLength(3));

constructor(private service: ClienteService,
  private toast: ToastrService,
  private router: Router
){
}



create():void{
  this.service.create(this.cliente).subscribe(() =>{
    this.toast.success('Cliente cadastrado com sucesso', 'Cadastro', {timeOut:4000, progressBar:true, closeButton:true})
    this.router.navigate(['clientes'])
  }, ex=>{
    if(ex.error.errors){
      ex.error.errors.forEach(element =>{
        this.toast.error('Cpf invalido', 'Cpf', {timeOut:5000, progressBar:true, closeButton:true})
      })
    }
    else{
      this.toast.error(ex.error.message)
    }
  })
}

addPerfil(perfil: any): void{

  if(this.cliente.perfis.includes(perfil)){
    this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
  }
  else{
    this.cliente.perfis.push(perfil)
  }
}

validaCampos():boolean{
  return this.nome.valid && this.cpf.valid 
  && this.email.valid && this.senha.valid
}

}
