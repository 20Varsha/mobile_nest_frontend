import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient, private router: Router) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Token expired or invalid, redirect to login
      this.router.navigate(['/login']);
    }
    return throwError('Something went wrong; please try again later.');
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data)
      .pipe(catchError(this.handleError.bind(this)));
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data)
      .pipe(catchError(this.handleError.bind(this)));
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
  
}
