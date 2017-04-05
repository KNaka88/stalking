import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public lat: number = 45.5206223;
  public lng: number = -122.6795871;
  public mario: string =  "../assets/img/dog.png";

  constructor() { }

  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((location) => {
          this.setLatLng(location.coords.latitude, location.coords.longitude);
      });
    }
  }

  setLatLng(lat:number, lng:number) {
    this.lat = lat;
    this.lng = lng;
  }

}
