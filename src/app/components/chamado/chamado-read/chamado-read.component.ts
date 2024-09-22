import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatLabel, MatHint, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';

@Component({
  selector: 'app-chamado-read',
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
  templateUrl: './chamado-read.component.html',
  styleUrl: './chamado-read.component.css'
})
export class ChamadoReadComponent implements OnInit {
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
  
  constructor(private service:ChamadoService,
    private toastService: ToastrService,
    private activedRoute: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    this.chamado.id  = this.activedRoute.snapshot.paramMap.get('id')
    this.findById();

  }

  findById():void{
    this.service.findById(this.chamado.id).subscribe(resposta =>{
      this.chamado = resposta;
    }, ex=>{
      this.toastService.error(ex.error.message,'Erro',
        {timeOut:4000, closeButton:true, progressBar:true});
    })
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
