import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  getProducts(): Observable<any> {
    const token = localStorage.getItem('token'); // or sessionStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/products`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getProductDetails(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  buyProduct(productId: string, accountDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/buy`, {
      productId,
      accountDetails
    });
  }
}
