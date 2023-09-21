import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  count = 0;
  loggedIn!: boolean;
  isAdmin!: boolean;
  constructor(private authSer: AuthService) { }
  ngOnInit(): void {
    this.loggedIn = this.authSer.isLoggedIn();
    this.isAdmin = this.authSer.isAdmin()

    if (localStorage.getItem('mycart') != undefined) {
      let cdata: any = localStorage.getItem('mycart');
      let data = JSON.parse(cdata);
      this.count = data.length;
    }
    this.authSer.subject.subscribe((res: any) => {
      let data = res.cartData;
      this.count = data.length;
    })
  }
  signout() {
    if (confirm("Do you want to logout")) {
      this.authSer.logout();
    }
  }
  getvalue(val: string) {
    this.authSer.setSearch(val);
  }
}
