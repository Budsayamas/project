import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { AddPetPage } from '../add-pet/add-pet';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { EditPage } from '../edit/edit';
import { CarePage } from '../care/care';
import { CaredetailPage } from '../caredetail/caredetail';
import { SchedulePage } from '../schedule/schedule';
import { VaccinePage } from '../vaccine/vaccine';

@IonicPage()
@Component({
  selector: 'page-my-pet',
  templateUrl: 'my-pet.html',
})
export class MyPetPage {
  result: any;
  email: any;
  private contentData: any;
  disEmail: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private db: FirestoreServiceProvider,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private actionsheetCtrl: ActionSheetController
  ) {
    this.result = this.navParams.get('result')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPetPage');
  }
  ionViewWillEnter() {
    this.retrieveCollection();
    this.disEmail = this.result.email;
    console.log(this.result.email);
  }
  retrieveCollection(): void {
    this.db.getDocuments(this.db.COLLECTION, this.result.email).then((data) => {
      if (data.length == 0) {
        this.presentToastWithOptions("No data found on firestore");
      } else {
        this.contentData = data;
      }
    }).catch((error) => {
      this.displayAlert("ผิดพลาด", error.message);
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

  deleteDocument(obj): void {
    const confirm = this.alertCtrl.create({
      title: 'ลบข้อมูล',
      message: 'คุณต้องการลบข้อมูล: <strong>' + obj.name + "</strong>",
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.db.deleteDocument(this.db.COLLECTION, obj.docid).then((data) => {
              this.displayAlert("ลบข้อมูล", "ข้อมูล" + obj.name +
                "ลบข้อมูลสำเร็จ!");
              this.retrieveCollection();

            }).catch((error) => {
              this.displayAlert("ผิดพลาด", error.message);
            })

          }
        },
        {
          text: 'ยกเลิก',
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
      buttons: ['เสร็จสิ้น']
    });
    alert.present();
  }

  displayActionSheet(obj) {
    this.actionsheetCtrl.create({
      title: "" + obj.name,
      buttons: [ {
        text: "เพิ่มการรักษา",
        icon: "redo",
        handler: () => {
          this.gotoAddCare(obj);
        }
      },
      {
        
        text: "ข้อมูลสัตว์เลี้ยง",
        icon: "redo",
        handler: () => {
          this.gotoDetailCare(obj);
        }
      },
      // {
        
      //   text: "ข้อมูลสัตว์เลี้ยง",
      //   icon: "redo",
      //   handler: () => {
      //     this. gotoAddVaccine(obj);
      //   }
      // },
      {
        text: "แก้ไข",
        icon: "redo",
        handler: () => {
          this.gotoEditDocument(obj);
        }
      },

      // {
      //   text: "นัดหมาย",
      //   icon: "redo",
      //   handler: () => {
      //     this.gotoSchedule(obj);
      //   }
      // },
      {
        text: "ลบ",
        role: "destructive",
        icon: "trash",
        handler: () => {
          this.deleteDocument(obj);
        }

      },
      {
        text: "ยกเลิก",
        icon: "close",
        role: 'cancel',
        handler: () => { }
      }]
    }).present();
  }

  gotoAddPet() {
    this.navCtrl.push(AddPetPage, {
      result: this.result
    });

  }
  gotoEditDocument(doc) {
    this.navCtrl.push(EditPage, { editDoc: doc });

  }
  gotoAddCare(doc) {
    this.navCtrl.push(CarePage, { editDoc: doc });
  }
  gotoDetailCare(doc){
    this.navCtrl.push(CaredetailPage,{ editDoc: doc });
  }
  gotoSchedule(doc){
    this.navCtrl.push(SchedulePage,{ editDoc: doc });
  }
  gotoAddVaccine(doc) {
    this.navCtrl.push(VaccinePage , { editDoc: doc });
  }
  
}
