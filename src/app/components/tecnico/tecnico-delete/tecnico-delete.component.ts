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
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
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
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css'
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id:'',
    nome:'',
    cpf:'',
    email:'',
    senha:'',
    perfis: [],
    dataCriacao:''
  }  

  
  constructor(private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){ }

  ngOnInit(): void {
    this.tecnico.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findById()
  }

  findById():void{
    this.service.findById(this.tecnico.id).subscribe(resposta =>{
      resposta.perfis=[]
      this.tecnico = resposta;
    })
  }
  
  delete():void{
    this.service.delete(this.tecnico.id).subscribe(() =>{
      this.toast.success('Tecnico deletado com sucesso', 'Delete',{timeOut:5000, progressBar:true, closeButton:true})
      this.router.navigate(['tecnicos'])
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
  
