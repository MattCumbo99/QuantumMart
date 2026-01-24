import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatTabsModule, MatTabNav } from '@angular/material/tabs';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, MatTabsModule, MatTabNav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  private http = inject(HttpClient);
  
  protected readonly title = signal('QuantumMart');

  private readonly hiddenRoutes = ['/login', '/register'];

  constructor(private router: Router) {}

  showNavBar(): boolean {
    return !this.hiddenRoutes.includes(this.router.url);
  }
}
