import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role = 'user'; 

  constructor(private apiService: ApiService, private router: Router) {}

  register() {
    const data = {email:this.email, name: this.name, password: this.password, role: this.role };
    this.apiService.register(data).subscribe(response => {
      this.router.navigate(['/login']);
    });
  }
}
