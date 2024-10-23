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
        localStorage.setItem('token', response.token); 
        this.router.navigate(['/products']); 
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
