import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent {
  showProducts = true;

  products = [
    { name: 'Sweats', rating: 4 },
    { name: 'Tank Top', rating: 3 },
    { name: 'Skully', rating: 5 }
  ];

  toggleProducts() {
    this.showProducts = !this.showProducts;
  }
}
