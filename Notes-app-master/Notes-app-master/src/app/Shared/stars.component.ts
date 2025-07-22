import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent {
  @Input() rating: number = 0;

  cropWidth: number = 0;

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75 / 5; 
    }

  onClick(): void {
    alert(`The rating ${this.rating} was clicked!`);
  }
}
