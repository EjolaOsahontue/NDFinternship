import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { StarsComponent } from './stars.component'; 

@NgModule({
  declarations: [
    ProductCardComponent,
    StarsComponent 
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductCardComponent,
    StarsComponent 
  ]
})
export class SharedModule { }