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
  showCreateModal = false;
  showDeleteModal = false;
  productToDelete: number | null = null;

  constructor(public productService: ProductService) {}

  // Regular CRUD methods
  addProduct() {
    if (this.newProduct.name && this.newProduct.price) {
      this.productService.addProduct(this.newProduct);
      this.resetForm();
      this.showCreateModal = false;
    }
  }

  selectProduct(product: any) {
    this.selectedProduct = {...product};
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

  confirmDelete(id: number) {
    this.productToDelete = id;
    this.showDeleteModal = true;
  }

  deleteProduct() {
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete);
      this.showDeleteModal = false;
      this.productToDelete = null;
      if (this.selectedProduct?.id === this.productToDelete) {
        this.selectedProduct = null;
      }
    }
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
