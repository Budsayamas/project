import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage,NavController, NavParams,AlertController, ToastController, ActionSheetController,Platform } from 'ionic-angular';
import { AddPhonePage } from '../add-phone/add-phone';
//** [EDIT] add some import module here!! */
 import { PhoneServiceProvider } from '../../providers/Phone-service/Phone';

 import { EditPhonePage } from '../edit-phone/edit-phone';
import { PhonePage } from '../phone/phone';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0

}

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',


})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  data:string ='';
  markers = [];
  
  private contentData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: PhoneServiceProvider,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private actionsheetCtrl: ActionSheetController,
    private geolocation:Geolocation,
    public platform : Platform
    
    ) {
      platform.ready().then(()=>{
        this.initMap();
      });

  }

  initMap() {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        console.log(location);
        map = new google.maps.Map(this.mapElement.nativeElement, {
          center: { lat: location.coords.latitude, lng: location.coords.longitude },
          zoom: 12
        });
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: { lat: location.coords.latitude, lng: location.coords.longitude },
          radius: 10000,
          type: ['veterinary_care']
        }, (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              this.createMarker(results[i]);
            }
          }
        });
      }, (error) => {
        console.log(error);
      }, options
    );
    var myPlace = { lat: 14.0245608, lng: 99.9951718 };
  }
 
  createMarker(place) {
    console.log(place);
    let open;
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc
    });
    
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
      if (place.opening_hours.open_now == false) {
        open = "ปิด";
      }else if(place.opening_hours == null || place.opening_hours == undefined){
        open = "ไม่มีข้อมูล";
      } else {
        open = "เปิด";
      }
      infowindow.setContent(
        '<div><strong>' + place.name + '</strong><br>' +
        'ทำการ: ' +
        open
        + '<br>' +
        place.vicinity + '</div>');
      infowindow.open(map, this);
    })
  }


  location(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.data = 'Lat:'+ resp.coords.latitude + '<br>' + 'Lng' + resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

  
  ionViewWillEnter(){
    this.retrieveCollection();
  }
  retrieveCollection(): void {
    this.db.getDocuments(this.db.COLLECTION).then((data)=>{
      if(data.length ==0){
        this.presentToastWithOptions("No data found on firestore");
      }else{
        this.contentData=data;
      }
    }).catch((error)=>{
      this.displayAlert("Error", error.message);
    });
      
    }
    async presentToastWithOptions(msg: string) {
      const toast = await this.toastController.create({
        message: msg,
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'Done'
      });
      toast.present();
    }
  
    deleteDocument(obj): void {
      const confirm = this.alertCtrl.create({
        title: 'Remove',
        message: 'Are you want to remove subject: <strong>' + obj. PhoneNum + "</strong>",
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.db.deleteDocument(this.db.COLLECTION,obj.docid).then((data)=>{
                this.displayAlert("Delete Success","the document"+ obj.subjectid + 
                "was successfully deleted!");
                this.retrieveCollection();
  
              }).catch((error)=>{
                this.displayAlert("Error",error.message);
              })
              
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Remove Cancelled!');
            }
          }
        ]
      });
      confirm.present();
    }
  
    displayAlert(title: string, message: string): void {
      let alert: any = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['Done']
      });
      alert.present();
    }
    
    displayActionSheet(obj) {
     this.actionsheetCtrl.create({
       title: "Document:"+ obj.subjectid,
       buttons:[{
         text:"Call",
         role: "destructive",
         icon: "phone",
         handler:()=>{
            
         }
       
       },{
         text: "Edit",
         icon: "redo",
         handler:()=>{
           this. gotoEditPhone(obj);
         }
       },{
         text:"Cancel",
         icon:"close",
         role:'cancel',
         handler:()=>{}
       }]
     }).present();
    }
  


  ionViewDidLoad() {

    
    console.log('ionViewDidLoad MapPage');
  }
  gotoAddPhone() {
    this.navCtrl.push(AddPhonePage);
 
}
  gotoEditPhone(doc) {
  this.navCtrl.push(EditPhonePage,{editDoc:doc});

}

gotoPhone(doc) {
  this.navCtrl.push(PhonePage);

}
}


