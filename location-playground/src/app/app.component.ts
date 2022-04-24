import { Component } from '@angular/core';
import { GeoLocationService } from './geo-location-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'location-playground';
  latitude: number = 0;
  longitude: number = 0;
  positionChangedSubscription: any;

  constructor(private geoLocationService: GeoLocationService){
    
  }

  onReceivePosition(position:any){
    console.log(position);
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude; 
  }

  onStartLocationWatch()
  {
    this.geoLocationService.enable();
    this.positionChangedSubscription = this.geoLocationService.positionChanged    
    .subscribe((position:any) => this.onReceivePosition(position));

    setTimeout(() => this.onStopLocationWatch(), 20000);
  }

  ngOnDestroy() {
    this.positionChangedSubscription.unsubscribe();
  }  

  onStopLocationWatch()
  {
    this.geoLocationService.disable();
    this.positionChangedSubscription.unsubscribe()
  }  
}
