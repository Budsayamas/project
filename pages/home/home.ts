import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { DogsPage } from '../dogs/dogs';
import { CatsPage } from '../cats/cats';
import { App } from 'ionic-angular';

import { SelectTopicPage } from '../select-topic/select-topic';
import { ShowDetailsPage } from '../show-details/show-details';
import { MapPage } from '../map/map';
import { AddPetPage } from '../add-pet/add-pet';
import { MyPetPage } from '../my-pet/my-pet';
import { LoginPage } from '../login/login';
import { VideoPage } from '../video/video';
import { SchedulePage } from '../schedule/schedule';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private contentData: any;
  selectPet: string = "dogs";
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  
  tabsChoose: any;
  home: any;
  Username: any;
  result: any;
  disUsername: any;
  email: any;
  date: string;
  public docID: string;
  public care: string;
  public name: string;
  public birthday: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private db: FirestoreServiceProvider,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private actionsheetCtrl: ActionSheetController,
    public provider: FirestoreServiceProvider,
    private app: App
  ) {

    this.provider.pet = "Dog";
    this.email = this.navParams.get('email');
    console.log(this.email)
    this.retrieveCollection();

  }
  ionViewDidLoad() {
    this.date = new Date().toLocaleString();
    console.log(this.date);

    console.log('ionViewDidLoad WelgamePage');
    this.provider.getUserAccount(this.email).then(
      (data) => {
        console.log(JSON.stringify(data));
        let obj = data;
        console.log(obj)
        for (let result of obj) {
          console.log(result);
          console.log(result.email);
          console.log(result.Username);
          this.Username = result.Username;
          this.result = result;
          this.disUsername = this.result.Username
          this.docID = this.result.docid;
          console.log(this.docID);

        }
      }
    ).catch(error => {
      console.log(error)
    });
  }
  retrieveCollection(): void {
    this.db.getDocuments(this.db.COLLECTION, this.email).then((data) => {
      if (data.length == 0) {
        this.presentToastWithOptions("No data found on firestore");
      } else {
        this.contentData = data;
        console.log(this.contentData[0].name);
        for (let i = 0; i < this.contentData.length; i++) {
          console.log(this.contentData[i].schedule);
          var ori = this.contentData[i].schedule;
          var sp = ori.split(",");
          console.log(sp.length);
          for (let j = 0; j < sp.length; j++) {
            console.log(sp[j]);
            var sp2 = sp[j].split("/");
            console.log(sp2[2]);
            var spnow = this.date.split(",");
            console.log(spnow[0]);
            var spday = sp2[2].split("-");
            var spdaynow = spnow[0].split("/");
            console.log(spday, spdaynow);
            var Dnow: number = spday[2]*1;
            var Dset: number = +spdaynow[1]*1;
            var Ynow: number = spday[0]*1;
            var Yset: number = +spdaynow[2]*1;
            var Mnow: number = spday[1]*1;
            var Mset: number = +spdaynow[0]*1;
            
            console.log(Dnow+""+Dset+""+Ynow+""+Yset+""+Mnow+""+Mset);
            
            if (Ynow==Yset&&Mnow== Mset&&Dnow==Dset) {
              console.log("GOOD");
              
              let alert: any = this.alertCtrl.create({
                title: "แจ้งเตื่อน",
                subTitle:sp2[0] +"รายละเอียด:"+ sp2[1] +"เวลา:"+ sp2[3],
                buttons: ['รับทราบ']
              });
              alert.present();
            }
          }
        }
      
      }
    }).catch((error) => {
      // this.displayAlert("ผิดพลาด", error.message);
    });

  }
  async presentToastWithOptions(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'เสร็จสิ้น'
    });
    toast.present();
  }
  displayAlert(title: string, message: string): void {
    let alert: any = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['เสร็จสิ้น']
    });
    alert.present();
  }
  onswipe($event) {
    console.log($event);
    if ($event.deltaX < 0) {
      if (this.selectPet == "dogs") {
        this.selectPet = "cats";
      } else {
        console.log("do not thing");
      }
    } else if ($event.deltaX > 0) {
      if (this.selectPet == "cats") {
        this.selectPet = "dogs";
      } else {
        console.log("do not thing");
      }
    } else {
      console.log("do not thing");
    }
  }
  selectDog() {
    this.provider.pet = "Dog";
    this.selectPet = "dogs";
  }

  selectCat() {
    this.provider.pet = "Cat";
    this.selectPet = "cats";
  }
  selectLearning() {
    this.navCtrl.push(SelectTopicPage);
  }
  selectEmergency() {
    this.navCtrl.push(MapPage);
  }
  selectMyPet() {
    this.navCtrl.push(MyPetPage, {
      result: this.result
    });
  }
  selectVideo() {
    this.navCtrl.push(VideoPage);
  }
  selectSchedule() {
    this.navCtrl.push(SchedulePage);
  }

  logout() {
    this.provider.logOut().then(
      () => {
        console.log("Log out");
        this.app.getRootNav().setRoot(LoginPage);
      }
    )
  }


}
