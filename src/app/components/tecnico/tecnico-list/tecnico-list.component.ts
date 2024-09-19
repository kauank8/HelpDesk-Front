import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  imports: [MatTableModule,
    MatPaginator,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],

  templateUrl: './tecnico-list.component.html',
  styleUrl: './tecnico-list.component.css'
})
export class TecnicoListComponent implements OnInit {
  
  ELEMENT_DATA: Tecnico[] = [
  ]
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

    constructor(private service: TecnicoService){}

  ngOnInit(): void {
   this.findAll()
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;



  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA)
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
