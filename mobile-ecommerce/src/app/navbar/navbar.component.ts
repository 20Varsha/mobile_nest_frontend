import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkAdminStatus();
  }

  checkAdminStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem('name') || 'User'; 
    } else {
      this.isLoggedIn = false;
    }
  }

  // Logout function
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name'); 
    localStorage.removeItem('role'); 
    this.router.navigate(['/login']);
  }
}
