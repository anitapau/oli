import {Component, ViewChild} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {MediaCapture} from '@ionic-native/media-capture';
import {Camera, CameraOptions} from "@ionic-native/camera";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photos: any;
  public base64Image: string;

  ngOnInit() {
    this.photos = [];
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera
      .getPicture(options).then(imageData => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      //reverse is to change the order of display to user; latest will be shown first

      this.photos.reverse();
    }, err => {
      console.log(err);
    });
  }


  //delete the image based on the index

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: "are you sure you want to delete this photo?",
      message: "",
      buttons: [{
        text: "No",
        handler: () => {

        }
      }, {
        text: "Yes",
        handler: () => {
          this.photos.slice(index, 1);
        }
      }]
    });
    confirm.present();
  }

  //Display the text field when the image is clicked
  displayTextArea(index) {

  let prompt= this.alertCtrl.create({
    title: 'Write note',
    inputs:[
      {
        name:'title',
        placeholder:'Write note'
      },
    ],

    buttons:[
      {
        text:'cancel',
        handler: data=>{
          console.log('cancel clicked');
        }

      },
      {
        text:'save',
        handler: data=> {
          console.log('save clicked')
        }
      }
    ]
  });
  prompt.present();

  }


  @ViewChild('myvideo') myVideo: any;

  constructor(public navCtrl: NavController, private camera: Camera, private alertCtrl: AlertController) {
  }


  startrecording() {
    new MediaCapture().captureVideo((videodata) => {
      alert(JSON.stringify(videodata));

    })
  }

  selectvideo() {
    let video = this.myVideo.nativeElement;
    var options = {
      sourceType: 2,
      mediaType: 1
    };
    new Camera().getPicture(options).then((data) => {
      video.src = data;
      video.play();
    })
  }
}
