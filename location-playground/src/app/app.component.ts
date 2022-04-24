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
  watcherId: number = 0;  

  constructor(){
    componentContext = this;
  }

  onStartLocationWatch(){
    var options = {
      enableHighAccuracy: true,
      timeout: 27000,
      maximumAge: 30000
    };
    
    this.watcherId = navigator.geolocation.watchPosition((position) => {      
      componentContext.latitude = position.coords.latitude;
      componentContext.longitude = position.coords.longitude;      
    }, null, options)    
  }

  onStopLocationWatch()
  {
    navigator.geolocation.clearWatch(this.watcherId);
  }
}
