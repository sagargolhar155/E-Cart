import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  myForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    manufacturer:new FormControl('',[Validators.required]),
    availableItems:new FormControl('',[Validators.required])
  })
  imagePath:any='';
  errMsg='';
  get fdata(){
    return this.myForm.controls;
  }
  constructor(private authSer:AuthService,private route:Router) { }
  proData: any = { name: '', category: '' ,price:'',description:'',manufacturer:'',availableItems:''}
  ngOnInit(): void {
  }
  upImage(event:any){
      if(event.target.files.length>0){
          this.imagePath=event.target.files[0];
      }
  }
  formData(){
    if(this.imagePath!=''){
       if(this.imagePath.type==="image/jpg" || this.imagePath.type==="image/jpeg" || this.imagePath.type==="image/png"){
          //when we upload any attaachment we send data with formdata 
          let fdata:any=this.myForm.getRawValue();
          let formData=new FormData();
          formData.append("name",fdata.name)
          formData.append("category",fdata.category)
          formData.append("price",fdata.price)
          formData.append("description",fdata.description)
          formData.append("manufacturer",fdata.manufacturer)
          formData.append("availableItems",fdata.availableItems)
          formData.append("attach",this.imagePath);
          this.authSer.postAddProduct(formData)
          .subscribe((res:any)=>{
            if(res.err==0){
                alert(res.msg);
                this.route.navigateByUrl('/');
            }
            if(res.err==1){
              this.errMsg=res.msg;
              this.proData = { email: '', category: '',price:'',description:'',manufacturer:'',availableItems:'' }
            }
          })
       }
       else {
        this.errMsg="Only support jpg or png images";
       }
    }
    else{
      this.errMsg="Please select a image";
    }
     
  }
}
