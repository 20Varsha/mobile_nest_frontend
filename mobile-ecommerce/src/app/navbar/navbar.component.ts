import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  username: string = '';
  private loginSub: Subscription | null = null; // Initialize with null

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loginSub = this.apiService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.username = localStorage.getItem('name') || 'User';
      }
    });
  }

  logout() {
    this.apiService.logout();
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
