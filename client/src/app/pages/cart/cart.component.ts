import { Component, OnInit, inject, DestroyRef  } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faUser = faUser;

  dropdownOpen = false;
  cartItems: any[] = [];
  total: number = 0;

  private destroyRef = inject(DestroyRef);

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.productService
      .getCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: any) => {
          this.cartItems = data.cart_items || [];
          this.total = this.cartItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
        },
        error: () => {
          this.toastr.error('Failed to load cart', 'Error');
        },
      });
  }

  loadCart() {
    this.productService.getCart().subscribe({
      next: (data: any) => {
        this.cartItems = data.cartitem_set || [];
        this.total = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },
      error: () => {
        this.toastr.error('Failed to load cart', 'Error');
      }
    });
  }

  removeItem(itemId: number) {
    this.productService.removeFromCart(itemId).subscribe({
      next: () => {
        this.toastr.success('Item removed from cart');
        this.loadCart();
      },
      error: () => {
        this.toastr.error('Failed to remove item', 'Error');
      }
    });
  }

  openDropdown() {
    this.dropdownOpen = true;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.info('Logged out');
  }
}
