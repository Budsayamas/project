import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { HomePage } from '../home/home';
// import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  form: any
  Username: string;
  email: any;
  password: string;
  confirmpassword: string;
  phonenumber: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public provider: FirestoreServiceProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController

  ) {

    this.form = formBuilder.group({
      'Username': ['', Validators.required],
      'email': ['', Validators.email],
      // 'Password': ['', Validators.required],
      phonenumber: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)]],

      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
      ],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  saveRegister(formValue) {

    let credentials = {
      Username: this.Username,
      email: this.email,
      password: this.password,
      phonenumber: this.phonenumber,
    }
    if(this.phonenumber.length==10){
      console.log(this.password , this.confirmpassword);
      
      if(this.password==this.confirmpassword){
        this.provider.addDocumentRegister(this.provider.COLLECTIONregister, credentials).then((data) => {
          this.displayAlert("สมัครสมาชิกสำเร็จ", "ยินดีต้อนรับคุณ" + this.Username);
          this.navCtrl.push(LoginPage);
          // this.clearInputForm();
        }).catch((error) => {
          this.displayAlert("การสมัครสมาชิกไม่ถูกต้อง", error.message)
          console.log(error)
        });
        this.provider.signUpwithEmail(credentials).then(
          (result) => {
            console.log(JSON.stringify(result));
          }
        ).catch((error) => {
          console.log(error)
        })
      }else{
        this.displayAlert("การยืนยันรหัสผ่านผิดพลาด","กรุณายืนยันรหัสผ่านให้ตรงกัน")
      }
    }
    // else{
    //   this.displayAlert("เบอร์โทรศัพท์ผิดพลาด","กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    // }
    
    
  }

  displayAlert(title: string, message: string): void {
    let alert: any = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['ยืนยัน']
    });
    alert.present();
  }

  clearInputForm() {
    this.Username = "";
    this.email = "";
    this.password = "";
    this.phonenumber = "";
  }
  validateEmail() {
    console.log('191');

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.email = re.test(this.email.value);
  }

}
