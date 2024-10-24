import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id'); // Get the order ID from the URL
    if (orderId) {
      this.getOrderDetails(orderId);
    }
  }

  getOrderDetails(orderId: string): void {
    this.apiService.getByOrder(orderId).subscribe(
      (data) => {
        this.order = data; // Assuming the API returns a single order object
      },
      (error) => {
        console.error('Error fetching order details:', error);
      }
    );
  }
}