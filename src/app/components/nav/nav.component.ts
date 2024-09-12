import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Para os ícones
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  constructor(private router: Router){}
  
  ngOnInit(): void {
    this.router.navigate(['home']);
  }

}
