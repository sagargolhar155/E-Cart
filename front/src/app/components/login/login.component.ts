import { Component } from '@angular/core';
import { FormControl,AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)])
   })

   get fdata(){
    return this.myForm.controls;
  }
  constructor(private authSer:AuthService,private router:Router) { }
  proData: any = { email: '', password: '' }

  errMsg:any;
  ngOnInit(): void {
   
  }

  postData(){
    let formData=this.myForm.getRawValue();
    this.authSer.postLogin(formData)
    .subscribe((res:any)=>{
      // console.log(res);
      
        if(res.err==0){
          localStorage.setItem("_token",res.token);
          this.router.navigate(['/'])
          .then(()=>{
            window.location.reload();
          })
        }
        if(res.err==1){
          this.errMsg=res.msg;
          this.proData = { email: '', password: '' }
        }
    })
  }

}
