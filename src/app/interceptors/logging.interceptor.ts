import { HttpInterceptorFn } from '@angular/common/http';



export const loggingInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = localStorage.getItem('authUser');
  if (authToken) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }



};
//TODO TODO mover header para interceptor
/*
private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};*/