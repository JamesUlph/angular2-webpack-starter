import {createSaga, installSagaMiddleware, whenAction, SagaRunner, put,Saga,SagaFactory,SagaIteration } from 'store-saga';
import {Http,Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';



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