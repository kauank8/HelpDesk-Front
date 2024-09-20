import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatLabel, MatHint, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
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
    NgxMaskPipe],
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.css'
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id:'',
    nome:'',
    cpf:'',
    email:'',
    senha:'',
    perfis: [],
    dataCriacao:''
  }  

  
  constructor(private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){ }

  ngOnInit(): void {
    this.cliente.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findById()
  }

  findById():void{
    this.service.findById(this.cliente.id).subscribe(resposta =>{
      resposta.perfis=[]
      this.cliente = resposta;
    })
  }
  
  delete():void{
    this.service.delete(this.cliente.id).subscribe(() =>{
      this.toast.success('Cliente deletado com sucesso', 'Delete',{timeOut:5000, progressBar:true, closeButton:true})
      this.router.navigate(['clientes'])
    }, ex=>{
      if (ex.status === 403) {
        this.toast.error('Você não tem autorização para realizar esta ação', 'Acesso Negado', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true
        });
      } 
      else{
        this.toast.error(ex.error.message)
      }
    })
  }
  
  
  }
  
