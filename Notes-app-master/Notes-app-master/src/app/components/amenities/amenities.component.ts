import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amenities',
  template: `
    <div class="amenities">
      <h2>Amenities</h2>
      <ul>
        <li *ngFor="let amenity of amenities">{{ amenity }}</li>
      </ul>
    </div>
  `,
  styles: [`
    .amenities {
      margin: 20px 0;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      padding: 5px 0;
      font-size: 16px;
    }
  `]
})
export class AmenitiesComponent {
  @Input() amenities: string[] = [];
}