import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router'; // Add Router

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router // Inject Router here
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProductDetails(productId);
    } else {
      console.error('Product ID is null');
    }
  }

  fetchProductDetails(productId: string) {
    this.apiService.getProductDetails(productId).subscribe((data) => {
      this.product = data;
    });
  }

  buyProduct(productId: string) {
    this.router.navigate(['/order', productId]); 
  }  

  // Back to Products method
  goBack() {
    this.router.navigate(['/products']); 
  }

}
