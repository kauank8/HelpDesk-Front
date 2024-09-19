import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Para os ícones
import { Router, RouterModule } from '@angular/router'; 
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    HeaderComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  constructor(private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ){}
  
  ngOnInit(): void {
    this.router.navigate(['tecnicos/create']);
  }
  logout(){
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso','Logout',{timeOut:7000, progressBar:true, closeButton:true})
  }
}
