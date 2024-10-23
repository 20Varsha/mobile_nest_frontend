import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; 

interface Specification {
  key: string;
  value: string;
  _id: string;
}

interface Product {
  _id: string;
  name: string;
  image: string;
  price:Number;
  specifications: Specification[];
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isAuthenticated: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.checkAuthentication();
    if (this.isAuthenticated) {
      this.loadProducts();
    } else {
      console.error('User is not authenticated');
    }
  }

  checkAuthentication(): void {
    const token = localStorage.getItem('token'); 
    this.isAuthenticated = !!token; 
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }

  buyProduct(productId: string): void {
    console.log('Buying product with ID:', productId);
  }
}