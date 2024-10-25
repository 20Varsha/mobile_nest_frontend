import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  loading: boolean = true; // Loading state

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProductDetails(productId);
    } else {
      console.error('Product ID is null');
      this.loading = false; // Set loading to false if ID is null
    }
  }

  fetchProductDetails(productId: string) {
    this.apiService.getProductDetails(productId).subscribe((data) => {
      this.product = data;
      this.loading = false; // Set loading to false after fetching data
    }, (error) => {
      console.error('Error fetching product details', error);
      this.loading = false; // Also set loading to false on error
    });
  }

  buyProduct(productId: string) {
    this.router.navigate(['/order', productId]); 
  }  

  goBack() {
    this.router.navigate(['/products']); 
  }
}
