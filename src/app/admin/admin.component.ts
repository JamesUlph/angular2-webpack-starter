import {Component} from 'angular2/core';
import {HTTP_PROVIDERS,Http,Response,Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'admin',
  styles: [require('./admin.css')
  
  ],
  
  template: require('./admin.html')
})
export class Admin {
  
  url:string='http://virtual2.ballistix.co.uk:8000'
  loggedIn:boolean=false;
  username:string;
  password:string;
  
  constructor(private http:Http) {    
    console.log(this.url);
  }
  
  getData(){
    var t=localStorage.getItem('token');
    
    var h:Headers=new Headers();
    h.append('Authorization',t);
    //h.append('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
    
    var data={};
    
    this.http.post(this.url+'/api/maintenance',JSON.stringify(data),{headers:h}).map(e=>{return e.json();})
    .subscribe(e=>{
      console.log(e);
    });
    
    
  }
  
  doLogin(username,password){
    var data={username,password};
    this.http.post(this.url+'/api/token',JSON.stringify(data)).map(e=>{return e.json();}).map(e=>{      
      console.log(e);
      if (e.status==200){        
        return e;
      }
      return null;
    }).subscribe( (e)=>{
      console.log('got here with ',e);
      if (e!=null){
        console.log('success');
        localStorage.setItem('token',e.token);
        this.loggedIn=true;
      }
      else {
        console.log('fail');
        this.logout();
      }
    })
  }
  
  logout(){
    console.log('perform logout');
    localStorage.clear();
    this.loggedIn=false;
  }
  
  login(){
    console.log('perform login...');
    this.doLogin(this.username,this.password);
  }
}