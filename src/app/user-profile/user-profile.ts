import { Component, inject } from '@angular/core';
import {
  MatCard,
  MatCardTitle,
  MatCardHeader,
  MatCardAvatar,
  MatCardSubtitle,
} from '@angular/material/card';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemListingService } from '../item-listings/item-listing.service';
import { ItemListing } from '../item-listings/item-listing.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemListingComponent } from '../item-listings/item-listing/item-listing';
import { DateService } from '../date/date.service';
@Component({
  selector: 'app-user-profile',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardAvatar,
    MatGridListModule,
    ItemListingComponent,
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private itemListingService: ItemListingService,
    private dateService: DateService,
  ) {}
  username!: string;
  user!: User;
  sDateCreated!: string;

  listings: ItemListing[] = [];

  ngOnInit(): void {
    this.username = this.authService.username ?? '';
    this.userService.getUserByUsername(this.username).subscribe({
      next: (user) => {
        if (user != null) {
          this.user = user;
          this.username = user.username;
          this.sDateCreated = this.dateService.formatSpecificDate(
            new Date(this.user.createdAt),
            'MM/dd/yyyy',
          );
        }
      },
      error: (err: HttpErrorResponse) => alert(err.message),
    });
    this.itemListingService.getAllListingsByUsername(this.username).subscribe({
      next: (data) => (this.listings = data),
      error: (_) => (this.listings = []),
    });
  }
}
