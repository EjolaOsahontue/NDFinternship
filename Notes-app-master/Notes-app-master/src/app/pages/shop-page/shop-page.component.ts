import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent {
  newProduct = {
    name: '',
    price: 0,
    description: '',
    imageUrl: ''
  };
  selectedProduct: any = null;
  isEditing = false;

  constructor(public productService: ProductService) {}

  addProduct() {
    if (this.newProduct.name && this.newProduct.price) {
      this.productService.addProduct(this.newProduct);
      this.resetForm();
    }
  }

  selectProduct(product: any) {
    this.selectedProduct = product;
    this.isEditing = false;
  }

  editProduct() {
    this.isEditing = true;
  }

  updateProduct() {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct);
      this.selectedProduct = null;
      this.isEditing = false;
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }

  resetForm() {
    this.newProduct = {
      name: '',
      price: 0,
      description: '',
      imageUrl: ''
    };
  }
}
