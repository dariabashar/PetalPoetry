import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [RouterModule, FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faUser = faUser;

  dropdownOpen = false;
  products: any[] = [];
  nextPage: string | null = null;
  prevPage: string | null = null;

  selectedCategories: string[] = [];
  selectedSizes: string[] = [];
  maxPrice: number = 1000;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadProducts(`${this.productService.apiUrl}/products/`);
  }

  loadProducts(url: string, filters: any = {}) {
    this.productService.getProductsByUrl(url, filters).subscribe({
      next: (data: any) => {
        this.products = data.results;
        this.nextPage = data.next;
        this.prevPage = data.previous;
      },
      error: () => {
        this.toastr.error('Failed to load products', 'Error');
      }
    });
  }

  goToNextPage() {
    if (this.nextPage) {
      this.loadProducts(this.nextPage);
    }
  }

  goToPrevPage() {
    if (this.prevPage) {
      this.loadProducts(this.prevPage);
    }
  }

  applyFilters() {
    console.log('Filters applied:', this.selectedCategories, this.selectedSizes, this.maxPrice);
  
    const params: any = {};
    if (this.selectedCategories.length > 0) {
      params.category = this.selectedCategories.join(',');
  }
    if (this.selectedSizes.length > 0) {
      params.size = this.selectedSizes.join(',');
    }
    params.price_lte = this.maxPrice;
  
    this.productService.getProducts(params).subscribe({
      next: (data: any) => {
        this.products = data.results;
        this.nextPage = data.next;
        this.prevPage = data.previous;
      },
      error: () => {
        this.toastr.error('Failed to apply filters', 'Error');
      }
    });
  }  

  toggleCategory(value: string) {
    this.toggleSelection(this.selectedCategories, value);
}

  toggleSize(value: string) {
    this.toggleSelection(this.selectedSizes, value);
  }

  toggleSelection(array: string[], value: string) {
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(value);
    }
  }

  addToCart(productId: number) {
    this.productService.addToCart(productId, 1).subscribe({
      next: () => {
        this.toastr.success('Product added to cart!');
      },
      error: () => {
        this.toastr.error('Please login to add products', 'Error');
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
