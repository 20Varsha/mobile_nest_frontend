import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  login(): void {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.apiService.login(credentials).subscribe({
      next: (response) => {
        // Assuming response contains token, role, and name
        const { token, role, name } = response;
        
        // Store token, role, and name in localStorage
        localStorage.setItem('token', token); 
        localStorage.setItem('role', role); 
        localStorage.setItem('name', name); 
        
        // Navigate to products page after successful login
        this.router.navigate(['/products']); 
      },
      error: (error) => {
        console.error('Login failed', error);
        // Optionally, show error messages to the user
      }
    });
  }
}
