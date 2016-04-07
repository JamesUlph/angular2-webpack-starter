//todos reducer
import { Action, Reducer, Store } from '@ngrx/store';

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const RESET = 'RESET';
export const SET_LOADING = 'SET_LOADING';
export const GET_STAFF = 'GET_STAFF';
export const USER_LOGIN = 'USER_LOGIN';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';
export const MASSIVE = 'MASSIVE';
export const MASSIVE2 = 'MASSIVE2';
export const BLOB = 'BLOB';
export const LOAD_USER = 'LOAD_USER';
export const LOADED_USER = 'LOADED_USER';

var initialState: any = {
    staff: [],
    items: [],
    auth: {loggedIn: false, username: ''},
    loading: false,
    blob: 'test'};

export const todos: Reducer<any> = (state = initialState, action: Action) => {
  //console.log('ACTION:', action.type, action.payload);
  //console.log(state);
    switch(action.type) {
        case SET_LOADING:
        return Object.assign({}, state, {loading: action.payload});

        case RESET:
        console.log('reset');
        return Object.assign({}, state, {staff:[],items: [], loading: false});

        case MASSIVE:
        console.log('massive fired');
        return Object.assign({},state,{blob:'massive2'});
        
        

        case ADD_TODO:
        console.log('store: add todo ',action.payload);
        return Object.assign({},state,{blob:action.payload});
        //const t = state.items.concat([], [{id: action.payload}]);
                
        //return Object.assign({}, state, {blob:'todo'});//,items: t});



        case GET_STAFF:
        console.log('get staff ', action.payload);
        return Object.assign({}, state, {staff: action.payload});

        case USER_LOGIN:
        console.log('user login');
        return Object.assign({}, state, {loading: true, auth: {loggedIn: true, username: action.payload.username, token: action.payload.token}});

        case CLEAR_LOGIN:
        return Object.assign({}, state, {auth: {loggedIn: false}});

        case LOADED_USER:
        console.log('LOADED_USER payload=',action.payload);
        return Object.assign({},state,{staff:action.payload});

    //console.log(t);
      //return t;
       //  return state;

    // case UPDATE_TODO:
    //   return state.map(todo => {
    //     return todo.id !== payload.id ?
    //       todo :
    //       Object.assign({}, todo, payload)
    //   });
    // case COMPLETE_TODO:
    //   return state.map(todo => {
    //     return todo.id !=saz= payload.id ?
    //       todo :
    //       Object.assign({}, todo, {completed: true})
    //   });
    // case DELETE_TODO:
    //   return state.filter(todo => todo.id !== payload.id);
    default:
      return state;
  }
}
