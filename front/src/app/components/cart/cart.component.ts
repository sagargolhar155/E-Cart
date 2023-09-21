import { Component, SimpleChanges } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
//import { ConsoleReporter } from 'jasmine';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  proData: any;
  data: any;
  errMsg: any;
  isAdmin!: boolean;
  prodid: any;
  total: number = 0;
  qty: any;
  cdata: any;
  arr: any = []
  data1: any;
  constructor(private authSer: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.authSer.isAdmin();
    if (localStorage.getItem('mycart') != undefined) {
      this.cdata = localStorage.getItem('mycart');
      this.data = JSON.parse(this.cdata)
      this.data.map((res: any) => {
        this.arr.push(res.pid)
      })
      this.data1 = { 'data': this.arr }
      this.authSer.getProductsByIds(this.data1)
        .subscribe((res: any) => {
          this.proData = res; 
          for (let i = 0; i < this.proData.length; i++) {
            this.qty = this.data[i].qty;
            this.total += this.proData[i].price * this.qty;
          }
          // this.authSer.settotal(this.total);
          localStorage.setItem('total', JSON.stringify(this.total));

        })
        
        
    }
    else {
      this.errMsg = "Cart is empty"
    }
  }
  plusqty(id: any) {
    let data: any;
    let items: any = []
    data = localStorage.getItem(`mycart`)
    JSON.parse(data).map((res: any) => {
      if (res.pid === id) {
        items.push({ pid: id, qty: ++res.qty })
      }
      else {
        items.push({ pid: res.pid, qty: res.qty })
      }
    })
    localStorage.setItem('mycart', JSON.stringify(items))
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate(['cart']);
    });
  }
  minusqty(id: any) {
    let data: any;
    let items: any = []
    data = localStorage.getItem(`mycart`)
    JSON.parse(data).map((res: any) => {
      if (res.pid === id) {
        if (res.qty > 1) {
          items.push({ pid: id, qty: --res.qty })
        }
        else {
          alert("quantity should not be 0")
          items.push(res)
        }
      }
      else {
        items.push({ pid: res.pid, qty: res.qty })
      }
    })
    localStorage.setItem('mycart', JSON.stringify(items))
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate(['cart']);
    });
  }
  delCart(id: any) {
    let data: any;
    let items: any = []
    data = localStorage.getItem(`mycart`)
    JSON.parse(data).map((res: any) => {
      if (res.pid != id) {
        items.push(res)
      }
    })

    if (confirm("do you want to delete data") === true) {
      localStorage.setItem('mycart', JSON.stringify(items))
      this.authSer.setCart(items)
      this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
        this.router.navigate(['cart']);
      });
    }
  }
}
