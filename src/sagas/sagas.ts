import {createSaga, installSagaMiddleware, whenAction, SagaRunner, put,Saga,SagaFactory,SagaIteration } from 'store-saga';
import {Http,Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

export const loginRequest = createSaga((http:Http)=>{
   return saga$=>saga$.filter(whenAction('LOGIN_REQUEST'))
   .do(e=>{console.log('login request ',e);
e.state.loading=true;
})
   //.delay(1000)
   .flatMap((saga)=>{
       console.log(saga);
        var data={username:saga.action.payload.username,password:saga.action.payload.password};
        console.log(saga.state);
       const query=http.post('http://virtual2.ballistix.co.uk:8000/api/token',JSON.stringify(data));
  
        return query.map(e=>e.json());
   })
   .map( res => {
     console.log(res);
     if (res.status==200){
         localStorage.setItem('token',res.token);
         return {type:'LOGIN_COMPLETE',payload:res.token};
     }
   })
   .catch(error => {
       console.log('error');
       return Observable.of(false);
   }
    )
   
},[Http]);

export const increment = createSaga((http:Http)=>{
  
  //this.http.post(this.url+'/api/maintenance',JSON.stringify(data),{headers:h}).map((e)=>e.json())
  //  .subscribe(e=>{
  //    console.log(e);
  //    this.store.dispatch({type:'LOADED_USER',payload:e.result});
  //  });
  
  
  return saga$ => saga$  
  .filter(whenAction('LOAD_MAINTENANCE'))  
  .do( e => {console.log('saga LOAD_MAINTENANCE')})
  //.map( saga => {console.log('map');return saga.state.blob='x'} )
   
  .flatMap( (saga)=>{
      console.log('init post ',saga);
      var t=localStorage.getItem('token'); 
      if (t==null) return Observable.of(null);
      var h:Headers=new Headers();
      h.append('Authorization',t);
      
      const query=http.post('http://virtual2.ballistix.co.uk:8000/api/maintenance',JSON.stringify({type:''}),{headers:h});
  
        
  
      return query.map((e)=>e.json()).catch((e)=>{return Observable.of(null)});
     
  })
  
   
  .map(    
    (saga) => {
        if (saga==null) {
            console.log('no data.');
            return false
        };
        
        
        console.log('after=',saga.result);
      return {type:'LOADED_USER',payload:saga.result};   
    })//.delay(1)
       
},[Http]);