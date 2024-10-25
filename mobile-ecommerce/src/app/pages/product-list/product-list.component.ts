import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    isAdmin: boolean = false;
    specifications: string = '';
    userName: string = '';

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.checkAdminStatus();
        this.fetchProducts();
        const user = localStorage.getItem('name');
        if (user) {
            this.userName = user
        }
    }

    checkAdminStatus() {
        const adminStatus = localStorage.getItem('role');
        if (adminStatus == 'admin') {
            this.isAdmin = true;
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
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.product.image = e.target.result;
            };
            reader.readAsDataURL(file);
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
                // Show success alert using Swal
                Swal.fire({
                    title: 'Product Added!',
                    text: 'The product has been successfully added.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            },
            error: (err) => {
                console.error('Error adding product:', err);
                // Show error alert using Swal
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add product. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }

    resetForm() {
        this.product = { _id: '', name: '', image: '', price: '', specifications: [] };
        this.selectedImage = null;
        this.specifications = '';
    }
}
