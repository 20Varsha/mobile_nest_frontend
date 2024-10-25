import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService,private router: Router) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id'); 
    if (orderId) {
      this.getOrderDetails(orderId);
    }
  }

  getOrderDetails(orderId: string): void {
    this.apiService.getByOrder(orderId).subscribe(
      (data) => {
        this.order = data; 
      },
      (error) => {
        console.error('Error fetching order details:', error);
      }
    );
  }

  redirectToProducts(orderId:string) {
      this.router.navigate(['/product-details',orderId]); 
    }
}