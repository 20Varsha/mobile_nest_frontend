import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  productId: string = '';
  accountDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.productId = this.route.snapshot.paramMap.get('id');
  }

  buyProduct() {
    this.apiService.buyProduct(this.productId, this.accountDetails).subscribe(response => {
      // Handle success
      alert('Product purchased successfully!');
    });
  }
}
