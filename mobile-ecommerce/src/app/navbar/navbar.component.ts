import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean=false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkAdminStatus();
  }

  checkAdminStatus() {
    const adminStatus = localStorage.getItem('token');
    if (adminStatus) {
      this.isLoggedIn = true; 
    } else {
      this.isLoggedIn = false; 
    }
  }

  // Logout function
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
