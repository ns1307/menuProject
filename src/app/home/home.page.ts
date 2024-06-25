import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  menuItems: any[] = [];
  skip = 0;
  limit = 20;
  position: { latitude: number, longitude: number } | null = null;  // Define the global variable
  message: string = 'Yakınınızdaki restoranları görmek için konuma izin vermeniz gerekmektedir.';
  constructor(private menuService: MenuService,private geoService: GeolocationService) {}

  ngOnInit() {
    this.getLocation();
  }

  loadMenuItems(event?: any) {
    if (this.position) {
      this.menuService.getMenuItems(this.skip, this.limit,this.position.latitude,this.position.longitude).subscribe(data => {
        this.menuItems = [...this.menuItems, ...data.response];
        if (event) {
          event.target.complete();
        }
        this.skip += this.limit;
      });
    }
    else {
      this.message = 'Lütfen konum iznine izin verin.';
    }
  }
  getLocation() {
    this.geoService.getCurrentLocation().then(position => {
      console.log("lat:"+position.latitude);
      console.log("long:"+position.longitude);
      this.position = position;  // Set the position variable
      this.message = '';  // Clear any previous error message
      this.loadMenuItems();
    }).catch(error => {
      this.message = 'Konum bilgisi alınamadı. Lütfen sayfayı yenileyin ve konum bilgisine izin verin.';
      console.error('Error getting location', error);
    });
  }
  calculateDistance(longitude: number,latitude: number): string{
    if (this.position) {
      // Earth's radius in kilometers
      const R = 6371;

      // Convert degrees to radians
      const degToRad = (deg: number) => deg * (Math.PI / 180);

      // Differences in coordinates, converted to radians
      const latDiff = degToRad(latitude - this.position.latitude);
      const lonDiff = degToRad(longitude - this.position.longitude);

      // Haversine formula
      const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
                Math.cos(degToRad(this.position.latitude)) * Math.cos(degToRad(latitude)) *
                Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in kilometers

      // Rounding the distance to three decimal places and converting to string
      return distance.toFixed(2);
    }
    else {
      return "-";
    }

  }
}
