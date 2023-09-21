import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent {
  id: any;
  proData: any;
 constructor(private route: ActivatedRoute, private pser: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pser.getDataByid(this.id)
      .subscribe(res  => {
        this.proData = res;
      })
  }
  addCart(id:any)
  {
    let item={pid:id,qty:1}
    if (localStorage.getItem('mycart') != undefined) {
      let cdata: any = localStorage.getItem('mycart');
      let arr = JSON.parse(cdata);
      let flag=0;
       arr.map((res:any)=>{
        if(res.pid===id)
        {
          flag=1;
        }
       })
      if (flag==1) {
        alert("Product Already in a cart")
      }
      else {
        arr.push(item);
        localStorage.setItem('mycart', JSON.stringify(arr));
        this.pser.setCart(arr)
        alert("Add Cart Succuessfully")
        this.router.navigateByUrl('/products');
      }
    }
    else {
      let arr = [];
      arr.push(item);
      localStorage.setItem('mycart', JSON.stringify(arr));
      this.pser.setCart(arr)
      alert("Add Cart Succuessfully")
      this.router.navigateByUrl('/products');
    }
  }
}
