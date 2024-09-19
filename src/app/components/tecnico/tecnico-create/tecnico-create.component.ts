import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormControl, FormsModule, Validators} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatHint } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-tecnico-create',
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
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.css'
})
export class TecnicoCreateComponent {
nome: FormControl = new FormControl(null, Validators.minLength(3));
cpf: FormControl = new FormControl(null, Validators.required);
email: FormControl = new FormControl(null, Validators.email);
senha: FormControl = new FormControl(null, Validators.minLength(3));

constructor(){

}

validaCampos():boolean{
  return this.nome.valid && this.cpf.valid 
  && this.email.valid && this.senha.valid
}
}
