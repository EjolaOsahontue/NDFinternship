import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() selected = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<number>();

  selectProduct() {
    this.selected.emit(this.product);
  }

  deleteProduct() {
    this.deleted.emit(this.product.id);
  }
}
