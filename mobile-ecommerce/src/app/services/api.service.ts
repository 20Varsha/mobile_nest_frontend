// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api/v1';
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
    return throwError('Something went wrong; please try again later.');
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data).pipe(
      tap((response: any) => {
        const { token, role, name } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('name', name);
        this.isLoggedInSubject.next(true);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }


  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data)
      .pipe(catchError(this.handleError.bind(this)));
  }

  addProduct(productData: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/products/add`, productData,{ headers }); // Sending JSON
}
  
  getProducts(): Observable<any> {
    const token = localStorage.getItem('token'); 
    return this.http.get(`${this.baseUrl}/products`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(catchError(this.handleError.bind(this)));
  }

  getProductDetails(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/products/${id}`, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

  placeOrder(productId: string, quantity: number, accountDetails: any, shippingAddress: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const payload = {
      productId,
      quantity,
      accountDetails,
      shippingAddress
    };
    return this.http.post(`${this.baseUrl}/orders/place-order`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

   // New method to get all orders
   getOrders(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/orders`, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

  //  get order details by ID
  getByOrder(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/orders/${id}`, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  
}
