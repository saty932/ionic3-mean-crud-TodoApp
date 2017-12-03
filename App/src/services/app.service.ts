import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AppService{
    constructor(private http:Http){
        console.log('App Service Initialized...');
    }
    getTodos(){
        return this.http.get('http://192.168.0.51:3000/api/todos')
        .map(res => res.json());
    }
    addToTodos(newTodo){
        //console.log(newTodo);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://192.168.0.51:3000/api/newtodo', JSON.stringify(newTodo), {headers: headers})
        .map(res => res.json());
    }

    deleteTodo(todo){
        return this.http.delete('http://192.168.0.51:3000/api/removeFromTodo/'+JSON.parse(JSON.stringify(todo._id)))
        .map(res => res.json());
    }
    
    updateTodo(todo){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://192.168.0.51:3000/api/todo/'+todo._id, JSON.stringify(todo), {headers: headers})
        .map(res => res.json());
    }

}