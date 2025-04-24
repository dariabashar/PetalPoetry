import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getProducts(params: any = {}) {
    return this.http.get(`${this.apiUrl}/products/`, { params });
  }

  addToCart(productId: number, quantity: number) {
    return this.http.post(`${this.apiUrl}/products/add-to-cart/`, {
      product_id: productId,
      quantity: quantity
    });
  }

  removeFromCart(itemId: number) {
    return this.http.delete(`${this.apiUrl}/cart/item/${itemId}/delete/`);
  }
  
  getCart() {
    return this.http.get(`${this.apiUrl}/cart/`);
  }  
  
  getProductsByUrl(url: string, params: any = {}) {
    return this.http.get(url, { params });
  }  
  getProductById(id: string) {
    return this.http.get(`${this.apiUrl}/products/${id}/`);
  }   
}
