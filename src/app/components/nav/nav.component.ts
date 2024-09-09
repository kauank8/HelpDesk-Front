import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Para os ícones

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
