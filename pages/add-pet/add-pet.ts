import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-add-pet',
  templateUrl: 'add-pet.html',
})
export class AddPetPage {
  
  public currentImage: any;
  public form: any;
  public name: string;
  public birthday: string;
  public dogorcat: string;
  public breed: string;
  public sex: string;
  
  public color:string;
  email: any;
  result: any;
  disEmail: any;
  // logoProfile : string ="assets/imgs/add-image.png"

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: FirestoreServiceProvider,
    public camera: Camera,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private actionsheetCtrl: ActionSheetController,) {
      this.result = this.navParams.get('result')

      console.log(this.result)

    this.form = formBuilder.group({
      'name': ['', Validators.required],
      'imageName': ['', Validators.required],
      'birthday': ['', Validators.required],
      'dogorcat': ['', Validators.required],
      'breed': ['', Validators.required],
      'sex': ['', Validators.required],
      'color': ['', Validators.required],
      
    });
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AddPetPage');
    this.disEmail = this.result.email;
  }

  saveDocument(formValue) {
    //** [EDIT] insert some code for save document here

    if (this.currentImage) {
      this.db.uploadImg(this.currentImage, this.name).then((refImg) => {
        this.db.getUrl(this.name).then((url) => {
          // alert(url)
          this.db.addDocument(this.db.COLLECTION, {
            email: this.disEmail,
            name: this.name,
            birthday: this.birthday,
            dogorcat: this.dogorcat,
            breed: this.breed,
            sex: this.sex,
            
            color:this.color,
            imageName: url,
            ////this.currentImage ใส่เป็น url รูปภาพที่เราอัพใน strorage.
          }).then((data) => {
            let alert: any =
            this.alertCtrl.create({
              title: 'เพิ่มข้อมูล',
              subTitle: 'เพิ่มข้อมูล'+ this.name +'สำเร็จ',
              buttons: [{
                text: 'เสร็จสิ้น',
                handler: () => {
                  this.navCtrl.pop();
                }
              }]
            });alert.present();

            this.clearInputForm();
          }).catch(() => { 
           
            this.alertCtrl.create({
              title: 'การเพิ่มข้อมูลล้มเหลว',
              subTitle:'กรุณากรอกข้อมูลให้ครบทุกช่อง',
              buttons:['เสร็จสิ้น']

            }).present();

          })
        })
      })
    } else {
      this.db.addDocument(this.db.COLLECTION, {
        email: this.disEmail,
        name: this.name,
        birthday: this.birthday,
        dogorcat: this.dogorcat,
        breed: this.breed,
        sex: this.sex,
       
        color: this.color,
        imageName: '../../assets/imgs/add-image.png',
        ////this.currentImage ใส่เป็น url รูปภาพที่เราอัพใน strorage.
      }).then((data) => {
        let alert: any =
        this.alertCtrl.create({
          title: 'เพิ่มข้อมูล',
          subTitle: 'เพิ่มข้อมูล'+ this.name +'สำเร็จ',
          buttons: [{
            text: 'เสร็จสิ้น',
            handler: () => {
              this.navCtrl.pop();
            }
          }]
        });alert.present();
      }).catch((eror) => {
  
        this.alertCtrl.create({
          title: 'การเพิ่มข้อมูลล้มเหลว',
          subTitle:'กรุณากรอกข้อมูลให้ครบทุกช่อง',
          buttons:['เสร็จสิ้น']

        }).present();

      });
    }
  }

  clearInputForm() {
    this.name = "";
    this.birthday = "";
    this.dogorcat = "";
    this.breed = "";
    this.sex = "";
    this.color="";
    this.currentImage = null;
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
      // this.logoProfile = 'data:image/jpeg;base64,' + imageData;
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
      // this.logoProfile = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
}
