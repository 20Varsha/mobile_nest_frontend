import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; 
import { Router } from '@angular/router';

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
  products: any[] = []; // Will store fetched products

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.fetchProducts(); 
  }

  fetchProducts() {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data; 
      console.log(this.products);
      
    });
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/product-details', productId]); 
  }
}