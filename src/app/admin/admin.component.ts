import {Component} from 'angular2/core';
import {HTTP_PROVIDERS,Http,Response,Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

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
  staff$:Observable<any>;
  token$:Observable<any>;
  loggedIn$:Observable<any>;
  loading$:Observable<any>;
  
  constructor(private http:Http,public store: Store<any>) {    
    console.log(this.url);
    this.staff$=store.select('staff');
    this.token$=store.select('token');
    this.loggedIn$=store.select('loggedIn');
    this.loading$=store.pluck('loading').do(e=>console.log(e));
  }
  
  getData(){
    var t=localStorage.getItem('token');
    
    var h:Headers=new Headers();
    h.append('Authorization',t);
    //h.append('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
    
    var data={};
    this.store.dispatch({type:'LOAD_MAINTENANCE'});
    return;
    this.http.post(this.url+'/api/maintenance',JSON.stringify(data),{headers:h}).map((e)=>e.json())
    .subscribe(e=>{
      console.log(e);
      this.store.dispatch({type:'LOADED_USER',payload:e.result});
    });
    
    
  }
  
  doLogin(username,password){
      
      this.store.dispatch({type:'LOGIN_REQUEST',payload:{username,password}});
      return;
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
        this.store.dispatch({type:'LOAD_MAINTENANCE'});
      }
      else {
        console.log('fail');
        this.logout();
        this.store.dispatch({type:'RESET'});
      }
    })
  }
  
  logout(){
    console.log('perform logout');
    localStorage.clear();
    this.loggedIn=false;
    this.store.dispatch({type:'RESET'});
  }
  
  login(){
    console.log('perform login...');
    this.doLogin(this.username,this.password);
  }
}