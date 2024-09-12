import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tecnico } from '../../../models/tecnico';
@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  imports: [MatTableModule,
    MatPaginator
  ],
  templateUrl: './tecnico-list.component.html',
  styleUrl: './tecnico-list.component.css'
})
export class TecnicoListComponent {
  ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      nome: 'Kauan Paulino',
      cpf: '123.456.789-10',
      email: 'kauan@gmail.com',
      senha: '12345',
      perfis: ['0'],
      dataCriacao: '15/08/2024'
    }
  ]
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
