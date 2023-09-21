import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.apiURL;
  public subject = new Subject;
  public total = new Subject;
  public search = new Subject;
  constructor(private http: HttpClient, private router: Router) { }
  postLogin(data: any) {
    return this.http.post(`${this.apiURL}auth`, data);
  }
  getProducts() {
    return this.http.get(`${this.apiURL}products`);
  }
  postAddProduct(data: any) {
    return this.http.post(`${this.apiURL}products`, data);
  }
  postRegis(data: any) {
    return this.http.post(`${this.apiURL}users`, data);
  }
  postEditProduct(id: any, data: any) {
    return this.http.put(`${this.apiURL}products/${id}`, data);
  }
  getDataByid(id: any) {
    return this.http.get(`${this.apiURL}products/${id}`);
  }
  deleteById(id: any) {
    return this.http.delete(`${this.apiURL}products/${id}`);
  }
  // get cart id data from product
  getProductsByIds(data:any)
  {
    return this.http.post(`${this.apiURL}getproductByIds`,data);
  }

  getaddressbyid(token:any)
{
  const headers = { 'Authorization': `${token}`};
  return this.http.get(`${this.apiURL}addresses`,{headers:headers})

}
postaddressbyid(token:any,data:any)
{
  const headers = { 'Authorization': `${token}`};
  return this.http.post(`${this.apiURL}addresses`,data,{headers:headers})
}
updateaddressbyid(token:any,data:any,id:any)
{
  const headers = { 'Authorization': `${token}`};
  return this.http.put(`${this.apiURL}addresses/${id}`,data,{headers:headers})

}
deleteaddressbyid(token:any,id:any)
{
  const headers = { 'Authorization': `${token}`};
  return this.http.delete(`${this.apiURL}addresses/${id}`,{headers:headers})
}

  isLoggedIn(): boolean {
    const data = localStorage.getItem("_token")
    if (!data) { return false }
    else { return true }
  }
  // get token from user
  getUser(): any {
    try {
      const data: any = localStorage.getItem("_token")
      return jwt_decode(data)
    }
    catch (e) {
      return null
    }
  }
  // check is admin
  isAdmin(): boolean {
    return !this.getUser() ? false : this.getUser().isAdmin;
  }
  // logout
  logout() {
    localStorage.removeItem("_token");
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload()
      })
  }
// set product id in cart
  setCart(data: any) {
    this.subject.next({ cartData: data })
  }
  setSearch(search: any) {
    this.search.next(search)
  }
  settotal(tot:any){
    this.total.next(tot)
    console.log(tot);
    
}

}
