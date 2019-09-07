import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,AlertController, ToastController, ActionSheetController  } from 'ionic-angular';
import { PhoneServiceProvider } from '../../providers/Phone-service/Phone';

import { EditPhonePage } from '../edit-phone/edit-phone';
/**
 * Generated class for the PhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phone',
  templateUrl: 'phone.html',
})
export class PhonePage {
  private contentData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: PhoneServiceProvider,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private actionsheetCtrl: ActionSheetController,
    
    ) {
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
  
    gotoEditPhone(doc) {
      this.navCtrl.push(EditPhonePage,{editDoc:doc});
    
    }

}
