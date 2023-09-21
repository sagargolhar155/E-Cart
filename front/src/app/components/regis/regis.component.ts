import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.css']
})
export class RegisComponent implements OnInit {
  myForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password:new FormControl('',[Validators.required,Validators.pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
    firstName:new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z]+')]),
    lastName:new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z]+')]),
    contactNumber:new FormControl('',[Validators.required,Validators.pattern('[7-9][0-9]{9}')])
   })
   get fdata(){
    return this.myForm.controls;
  }
  constructor(private authSer:AuthService,private router:Router) { }
  proData: any = { email: '', password: '' ,firstName:'',lastName:'',contactNumber:''}
  errMsg:any;
  succMsg:any;
  ngOnInit(): void {
  }
 postData(){
   let formData=this.myForm.getRawValue();
   console.log(formData);
   
   this.authSer.postRegis(formData)
   .subscribe((res:any)=>{
     if(res.err==0){
        this.succMsg=res.msg;
     }
     if(res.err==1){
         this.errMsg=res.msg;
         this.proData = { email: '', password: '',firstName:'',lastName:'',contactNumber:'' }
     }
   })
 }
}
