// AfterViewChecked, ElementRef, ViewChild: list out most recent messages first
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { AF } from '../providers/af';
import { FirebaseListObservable} from 'angularfire2';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})


export class IndexComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  // preset location and icon
  public lat: number = 45.5206223;
  public lng: number = -122.6795871;
  public mario: string =  "../assets/img/dog.png";

  // personal
  public newMessage: string;
  public messages: FirebaseListObservable<any>;

  constructor(public afService: AF) {
    this.messages = this.afService.messages;
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
          this.setLatLng(location.coords.latitude, location.coords.longitude);
      });
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log('Scroll to bottom failed');
    }
  }

  sendMessage() {
    this.afService.sendMessage(this.newMessage);
    this.newMessage = ' ';
  }

  setLatLng (lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }


  isYou(email) {
    if (email === this.afService.email) {
      return true;
    } else {
      return false;
    }
  }

  isMe(email) {
    if (email === this.afService.email) {
      return false;
    } else {
      return true;
    }
  }
  logout(){
    this.afService.logout();
  }



}
