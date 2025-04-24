import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any;

  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id!).subscribe({
      next: (data) => this.product = data,
      error: () => this.toastr.error('Failed to load product')
    });
  }

  addToCart() {
    this.productService.addToCart(this.product.id, this.quantity).subscribe({
      next: () => this.toastr.success('Product added to cart!'),
      error: () => this.toastr.error('Please login to add products', 'Error')
    });
  }

  incrementQuantity() {
    this.quantity++;
  }
  
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
