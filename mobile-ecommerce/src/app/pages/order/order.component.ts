import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  productId: string = '';
  accountDetails = {
    accountNumber: '',
    ifsc: '',
    bankName: '',
  };
  product: any; // Store product details

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || ''; // Get the product ID
    if (this.productId) {
      this.fetchProductDetails(this.productId);
    }
  }

  fetchProductDetails(productId: string) {
    this.apiService.getProductDetails(productId).subscribe(
      (data) => {
        this.product = data; // Store product details
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  buyProduct() {
    // Call the buyProduct method from the ApiService with productId and accountDetails
    this.apiService.buyProduct(this.productId, this.accountDetails).subscribe(
      response => {
        // Handle success response
        Swal.fire({
          title: 'Success!',
          text: 'Product purchased successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error => {
        // Handle error response
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue with your purchase. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
