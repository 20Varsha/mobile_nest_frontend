import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; 
import { Router } from '@angular/router';

interface Specification {
    key: string;
    value: string;
}

interface Product {
    _id: string;
    name: string;
    image: string;
    price: string;
    specifications: Specification[];
}

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    product: Product = { _id: '', name: '', image: '', price: '', specifications: [] };
    showModal: boolean = false;
    selectedImage: File | null = null;
    isAdmin: boolean = false;  // Changed to false by default
    specifications: string = '';

    constructor(private apiService: ApiService, private router: Router) {}

    ngOnInit() {
        this.checkAdminStatus(); // Check if user is an admin
        this.fetchProducts(); 
    }

    checkAdminStatus() {
        const adminStatus = localStorage.getItem('role');
        console.log(adminStatus);
        
        if(adminStatus=='admin'){
          this.isAdmin = true; // Convert string to boolean
        }
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

    openModal() {
        if (this.isAdmin) {  
            this.showModal = true;
        } else {
            alert('Only admins can add products.');
        }
    }

    closeModal() {
        this.showModal = false;
        this.resetForm();
    }

    onFileSelected(event: any) {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.product.image = e.target.result; // Set the image as a base64 string or URL
            };
            reader.readAsDataURL(file); // Convert to base64
        }
    }

    addProduct() {
        const productData = {
            name: this.product.name,
            image: this.product.image,
            price: this.product.price,
            specifications: this.specifications.split('\n').map(spec => {
                const [key, value] = spec.split(':');
                return { key: key ? key.trim() : '', value: value ? value.trim() : '' };
            })
        };

        this.apiService.addProduct(productData).subscribe({
            next: () => {
                this.fetchProducts();
                this.closeModal();
            },
            error: (err) => {
                console.error('Error adding product:', err);
                alert('Failed to add product. Please try again.');
            }
        });
    }

    resetForm() {
        this.product = { _id: '', name: '', image: '', price:'', specifications: [] };
        this.selectedImage = null;
        this.specifications = ''; 
    }
}
