import { Component, inject, OnInit } from '@angular/core';
import { ItemListingService } from '../item-listings/item-listing.service';
import { ItemListing } from '../item-listings/item-listing.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemListingComponent } from '../item-listings/item-listing/item-listing';
import { AuthService } from '../auth/auth.service';
import { MatButtonModule, MatFabButton } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [ItemListingComponent, MatGridListModule, MatFabButton, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  listings: ItemListing[] = [];

  readonly dialog = inject(MatDialog);

  constructor(
    private itemService: ItemListingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.itemService.getAllListings().subscribe({
      next: listings => this.listings = listings
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddListingDialogComponent, {
      width: '600px'
    });
  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}

@Component({
  selector: 'add-listing-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule
  ],
  templateUrl: './add-listing-dialog/add-listing.dialog.html',
  styleUrl: './add-listing-dialog/add-listing.dialog.scss'
})
export class AddListingDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddListingDialogComponent>);

  readonly listingForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    imageUrl: new FormControl(''),
    price: new FormControl('0.00', [Validators.required, Validators.pattern(RegExp('^[0-9]+(\.[0-9]{1,2})?$'))])
  });
}
