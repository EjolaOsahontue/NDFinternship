import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  rating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Sweats', price: 30000, rating: 4, description: 'High-quality comfortable sweatpants', imageUrl: '' },
    { id: 2, name: 'Polo', price: 45000, rating: 5, description: 'Siezed sights polo', imageUrl: '' }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct = {
      ...product,
      id: Math.max(...this.products.map(p => p.id)) + 1
    };
    this.products = [...this.products, newProduct];
    this.productsSubject.next(this.products);
  }

  updateProduct(updatedProduct: Product) {
    this.products = this.products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    this.productsSubject.next(this.products);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    this.productsSubject.next(this.products);
  }
}
