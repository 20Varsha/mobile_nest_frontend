import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  productId: string = '';
  accountDetails = {
    accountNumber: '',
    ifsc: '',
    bankName: '',
  };
  shippingAddress = {
    fullName: '',
    addressLine1: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    state: ''
  };
  product: any;
  quantity: number = 1;
  shippingCost: number = 50;
  taxAmount: number = 0;
  totalPrice: number = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (this.productId) {
      this.fetchProductDetails(this.productId);
    }
  }

  fetchProductDetails(productId: string) {
    this.apiService.getProductDetails(productId).subscribe(
      (data) => {
        this.product = data;
        this.calculateTotalPrice(); // Calculate total price on product fetch
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  calculateTotalPrice() {
    if (this.product && this.product.price) {
      this.taxAmount = this.product.price * 0.1;
      this.totalPrice = this.product.price * this.quantity + this.shippingCost + this.taxAmount;
    }
  }

  buyProduct() {
    const shippingAddress = {
      fullName: this.shippingAddress.fullName,
      addressLine1: this.shippingAddress.addressLine1,
      city: this.shippingAddress.city,
      postalCode: this.shippingAddress.postalCode,
      country: this.shippingAddress.country,
      state: this.shippingAddress.state,
      phoneNumber: this.shippingAddress.phoneNumber
    };

    this.apiService.placeOrder(this.productId, this.quantity, this.accountDetails, shippingAddress).subscribe(
      response => {
        Swal.fire({
          title: 'Success!',
          text: 'Product purchased successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/orders-list', response.orderId]);
          }
        });
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue with your purchase. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  goBack() {
    this.router.navigate(['/product-details', this.productId]);
  }

}

