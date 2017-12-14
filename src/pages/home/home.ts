import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaCapture } from '@ionic-native/media-capture';
import {Camera, CameraOptions} from "@ionic-native/camera";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photos: any;
  public base64Image:string;

  ngOnInit(){
    this.photos=[];
  }
  takePhoto() {
    const options: CameraOptions={
      quality:50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera
      .getPicture(options).then(imageData=> {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      //reverse is to change the order of display to user; latest will be shown first

      this.photos.reverse();
      this.sendData(ImageData);
    }, err=> {console.log(err);});}




  //delete the image based on the index

  deletePhoto(index) {
    alert("delete photo");
  }








  @ViewChild('myvideo') myVideo: any;
  constructor(public navCtrl: NavController, private camera:Camera) {
  }


  startrecording(){
    new MediaCapture().captureVideo((videodata) => {
    alert(JSON.stringify(videodata));

    })
  }

  selectvideo(){
    let video = this.myVideo.nativeElement;
    var options = {
      sourceType: 2,
      mediaType: 1
    };
    new Camera().getPicture(options).then((data) => {
      video.src= data;
      video.play();
    })
  }
}
