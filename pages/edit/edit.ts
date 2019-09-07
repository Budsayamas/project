import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { CameraOptions, Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  public form: any;
  public docID: string;
  public currentImage: any;
  public name: string;
  public birthday: string;
  public dogorcat: string;
  public breed: string;
  public sex: string;
 
  public sex1:string;
  public dogorcat1:string;
  public color:string;
  public imageName:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: FirestoreServiceProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public camera:Camera) {
       
      let today = new Date();
      console.log(today);
      let dd = String(today.getDate());
      let mm = String(today.getMonth()+1);
      let yyyy = today.getFullYear();

      let toDay = dd+" / "+mm+" / "+yyyy;
      console.log("today is:"+toDay);
      this.form = formBuilder.group({
        'name': ['', Validators.required],
        'birthday': ['', Validators.required],
        'dogorcat': ['', Validators.required],
        'breed': ['', Validators.required],
        'sex': ['', Validators.required],
        
        'color': ['', Validators.required], 
        'imageName': ['', Validators.required]
      });
  }
  ionViewDidLoad() {
    let editDoc =this.navParams.get("editDoc");
    this.docID=editDoc.docid;
    this.name=editDoc.name;
    this.birthday=editDoc.birthday;

    console.log(editDoc);
    this.dogorcat = editDoc.dogorcat;
    if(this.dogorcat == "dog"){
      this.dogorcat1 = "สุนัข";
    }else{
      this.dogorcat1 = "แมว";
    }
    this.sex=editDoc.sex;
    this.color=editDoc.color;
    this.imageName=editDoc.imageName;
    console.log(editDoc);
    this.breed = editDoc.breed;
    if(this.sex == "male"){
      this.sex1 = "เพศผู้";
    }else{
      this.sex1 = "เพศเมีย";
    }
 
   }
   updateDocument(formValue) {

    this.db.updateDocument(this.db.COLLECTION,this.docID,{
      name: this.name,
      birthday: this.birthday,
      dogorcat: this.dogorcat,
      breed: this.breed,
      sex: this.sex,
      color:this.color,
      imageName: this.imageName,
    }).then((data)=>{
      this.displayAlert("อัพเดท","ข้อมูล"+ this.name + "อัพเดทสำเร็จ");
      this.navCtrl.pop();
    }).catch((error)=>{
      this.displayAlert("ล้มเหลว","อัพเดทล้มเหลว");
    })

 }

 displayAlert(title: string, message: string): void {
   let alert: any = this.alertCtrl.create({
     title: title,
     subTitle: message,
     buttons: ['เสร็จสิ้น']
   });
   alert.present();
 }



 getimage() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false
  }

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    this.currentImage = 'data:image/jpeg;base64,' + imageData;
    this.imageName=this.currentImage;
  }, (err) => {
    // Handle error
  });

}

takePhoto() {
  const options: CameraOptions = {
    quality: 100,
    // targetHeight:200,
    // targetWidth:200,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,

  }
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    this.currentImage = 'data:image/jpeg;base64,' + imageData;
    this.imageName=this.currentImage;
  }, (err) => {
    // Handle error
  });



}
}

