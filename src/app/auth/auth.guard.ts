import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  let authenticated = authService.isAuthenticated()
 

  if(authenticated){
    return true
  }else{
    router.navigate(['login']);
    return false
  }

};
