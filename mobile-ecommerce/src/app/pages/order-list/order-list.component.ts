import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.apiService.getOrders().subscribe(
      (data) => {
        this.orders = data; 
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  viewOrderDetails(orderId: string): void {
    this.router.navigate(['/order-details', orderId]); 
  }

  redirectToProducts() {
    this.router.navigate(['/products']);
  }
}
