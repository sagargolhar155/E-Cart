import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  editForm = new FormGroup({
    id:new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
    landmark: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
    street: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
    state: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
    zipcode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')]),
    contactNumber: new FormControl('', [Validators.required, Validators.pattern('[7-9][0-9]{9}')])
  })
  addForm = new FormGroup({
    city: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
    landmark: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
    street: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
    state: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
    zipcode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')]),
    contactNumber: new FormControl('', [Validators.required, Validators.pattern('[7-9][0-9]{9}')])
  })
  get adddata() {
    return this.addForm.controls;
  }
  get editdata() {
    return this.editForm.controls;
  }

  form = new FormGroup({
    address: new FormControl('', Validators.required)
  });
  
  get f(){
    return this.form.controls;
  }
  constructor(private authSer: AuthService, private router: Router,public fb: FormBuilder) { }
  proData: any;
  prodata: any;

  errMsg: any;
  succMsg: any;
  total: any;
  token: any;
  ind: any;
  gettoken: any;
  ngOnInit() {
    this.total = localStorage.getItem('total')
    this.gettoken = localStorage.getItem(`_token`)
    this.authSer.getaddressbyid(this.gettoken)
      .subscribe((res: any) => {
        this.proData = res.address;
      })
    this.prodata = { name: '', city: '', landmark: '', street: '', state: '', zipcode: '', contactNumber: '' }
  }
  postData() {
    let formData = this.addForm.getRawValue();
    this.gettoken = localStorage.getItem(`_token`)
    this.authSer.postaddressbyid(this.gettoken, formData)
      .subscribe((res: any) => {
        console.log(res);
        alert("Address is added")
        this.authSer.getaddressbyid(this.gettoken)
          .subscribe((res: any) => {
            this.proData = res.address;
          })
        // this.router.navigateByUrl('/order')
      })
  }
  openmodel(data: any) {
    this.prodata = data
  }
  editData() {
    let fData = this.editForm.getRawValue();
    this.gettoken = localStorage.getItem(`_token`)
    
    this.authSer.updateaddressbyid(this.gettoken, fData,fData.id)
      .subscribe((res: any) => {
        alert("Address is updated");
        this.authSer.getaddressbyid(this.gettoken)
          .subscribe((res: any) => {
            this.proData = res.address;
          })
      })
  }
 
  deleteaddress(id: any) {
    this.gettoken = localStorage.getItem(`_token`)
    this.authSer.deleteaddressbyid(this.gettoken, id)
      .subscribe((res: any) => {
        console.log(res.address);
        alert("Address is deleted")
        this.authSer.getaddressbyid(this.gettoken)
          .subscribe((res: any) => {
            this.proData = res.address;
          })
      })
  }
  
  submit(){
   console.log(this.form.value);  
  }
}
