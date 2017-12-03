import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {AppService} from '../../services/app.service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	data:Data[];	
	todoData:any;
	todoHeading:any;
	constructor(public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public appService:AppService) {



	}
	showmodal(item){
		this.presentPrompt(item);
	}
	presentPrompt(item) {
		const alert = this.alertCtrl.create({
			title: 'Update Todo',
			inputs: [
			{
				name: 'Title',
				placeholder: item.todoHeading
			},
			{
				name: 'Info',
				placeholder: item.todoData
				
			}
			],
			buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				handler: data => {
					console.log('Cancel clicked');
				}
			},
			{
				text: 'update',
				handler: data => {
					if (data.Title || data.Info) {
						if(data.Title)
						{
							item.todoHeading=data.Title;
						}
						if(data.Info)
						{
							item.todoData=data.Info;	
						}
						this.appService.updateTodo(JSON.parse(JSON.stringify(item))).subscribe(data=>{
							console.log(data);	
						});
					} else {
						// invalid login
						return false;
					}
				}
			}
			]
		});
		alert.present();
	}
	delete(item,i){
		this.appService.deleteTodo(item).subscribe(data=>{
			console.log(data);
			this.data.splice(i,1);
		});
	}
	addTodo(){
		const alert = this.alertCtrl.create({
			title: 'Add new Todo',
			inputs: [
			{
				name: 'Title',
				placeholder:"Enter Todo Heading"
			},
			{
				name: 'Info',
				placeholder: "Enter Todo Description"
				
			}
			],
			buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				handler: data => {
					console.log('Cancel clicked');
				}
			},
			{
				text: 'Save',
				handler: data => {
					if (data.Title || data.Info) {
						var todo={
							"todoHeading":data.Title,
							"todoData":data.Info
						};
						this.appService.addToTodos(JSON.parse(JSON.stringify(todo))).subscribe(data=>{
							//console.log(data);
							this.data.push(data.todo);	
						});
					} else {
						// invalid login
						return false;
					}
				}
			}
			]
		});
		alert.present();
	}
	ionViewDidLoad(){
		
		this.appService.getTodos()
		.subscribe(todos => {
			//console.log(todos);
			this.data=todos;
			//console.log(this.data);
		});
	}

}
export interface Data{
	todoData:string;
	todoHeader:string;

}
