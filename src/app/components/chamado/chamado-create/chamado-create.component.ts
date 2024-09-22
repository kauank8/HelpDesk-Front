import { Component, OnInit } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnico';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ChamadoService } from '../../../services/chamado.service';
import { CommonModule } from '@angular/common';
import { Chamado } from '../../../models/chamada';
@Component({
  selector: 'app-chamado-create',
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
    NgxMaskPipe,
    MatSelect,
    MatOption,
    MatDividerModule,
    CommonModule
  ],
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css'
})
export class ChamadoCreateComponent implements OnInit {
  
  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',

  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status:     FormControl = new FormControl(null, [Validators.required]);
  titulo:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  tecnico:    FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);
  
  constructor(private service:ChamadoService,
    private clienteService:ClienteService,
    private tecnicoService:TecnicoService,
    private toastService: ToastrService,
    private router:Router
  ){}
  
  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create():void{
    this.service.create(this.chamado).subscribe(resposta =>{
      this.toastService.success('Chamado criado com sucesso', 'Novo chamado', 
        {timeOut:4000, closeButton:true, progressBar:true});
        this.router.navigate(['chamados'])
    }, ex=>{
      this.toastService.error(ex.error.message,'Erro',
        {timeOut:4000, closeButton:true, progressBar:true});
    })
  }

  findAllClientes():void{
    this.clienteService.findAll().subscribe(resposta=>{
      this.clientes = resposta;
    })
  }

  findAllTecnicos():void{
    this.tecnicoService.findAll().subscribe(resposta=>{
      this.tecnicos = resposta;
    })
  }
  validaCampos():boolean{
    return this.prioridade.valid && this.status.valid && this.titulo.valid 
       && this.observacoes.valid && this.tecnico.valid && this.cliente.valid

  }
}
