import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
/*
export const authInterceptor: HttpInterceptorFn =(req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  let token = localStorage.getItem('token')
  console.log('Auth Interceptor Executed');
  console.log('Token:', token)
  if(token){
    const cloneReq = req.clone({headers: req.headers.set('Authorization',`Bearer ${token}`)})
    return next(cloneReq)
  }
  else{

  }
  return next(req);
};

export const authInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useValue: authInterceptor,
    multi:true
  }
]*/

export const authInterceptor: HttpInterceptorFn =(req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  let token = localStorage.getItem('token')
  console.log('Auth Interceptor Executed');
  console.log('Token:', token)
  if(token){
    const cloneReq = req.clone({headers: req.headers.set('Authorization',`Bearer ${token}`)})
    return next(cloneReq)
  }
  return next(req);
} 