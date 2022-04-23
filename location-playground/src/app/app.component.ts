import { Component } from '@angular/core';

let componentContext: any = null;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'location-playground';
  latitude: number = 0;
  longitude: number = 0;
  

  constructor(){
    componentContext = this;
  }

  getLocation(){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      componentContext.latitude = position.coords.latitude;
      componentContext.longitude = position.coords.longitude;      
    }, null, options)
    
  }
}
