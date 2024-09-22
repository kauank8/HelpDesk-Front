import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatLabel, MatHint, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from '../../../models/chamado';
import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnico';
import { ChamadoService } from '../../../services/chamado.service';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
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
    CommonModule],
  templateUrl: './chamado-update.component.html',
  styleUrl: './chamado-update.component.css'
})
export class ChamadoUpdateComponent implements OnInit {
  
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
    private router:Router,
    private activedRoute: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    this.chamado.id  = this.activedRoute.snapshot.paramMap.get('id')
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById():void{
    this.service.findById(this.chamado.id).subscribe(resposta =>{
      this.chamado = resposta;
    }, ex=>{
      this.toastService.error(ex.error.message,'Erro',
        {timeOut:4000, closeButton:true, progressBar:true});
    })
  }

  update():void{
    this.service.update(this.chamado).subscribe(resposta =>{
      this.toastService.success('Chamado atualiazado com sucesso', 'Ataulização de chamado', 
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

  retornaStatus(status:any):string{
    if(status == '0'){
      return 'ABERTO'
    }else if(status=='1'){
      return 'EM ANDAMENTO'
    } else{
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade:any):string{
    if(prioridade == '0'){
      return 'BAIXA'
    }else if(prioridade=='1'){
      return 'MÉDIA'
    } else{
      return 'ALTA'
    }
  }
}
