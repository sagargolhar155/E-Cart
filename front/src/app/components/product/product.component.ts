import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  proData:any;
  search!:string;
  isAdmin!:boolean;
 p=1;
  constructor(private authSer:AuthService,private route:Router) { }

  ngOnInit(): void {
    this.isAdmin=this.authSer.isAdmin();
    this.authSer.getProducts()
    .subscribe((res:any)=>{
      if(res.err==0){
          this.proData=res.prodata;
      }
    })
    this.authSer.search.subscribe((res: any) => {
      this.search=res;
    })
  }
  delPro(id:any){
    if(confirm("Do u want to delete it ?")){
      this.authSer.deleteById(id)
      .subscribe((res:any)=>{
        if(res.err==0){
          let data = this.proData.filter((product: any) => product._id != id);
          this.proData = data;
        }
      })
    }
  }
  

}
