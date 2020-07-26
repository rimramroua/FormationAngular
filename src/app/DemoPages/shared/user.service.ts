import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Users } from '../Models/users.model';
import { Identifiers } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder,private Fb: FormBuilder, private http: HttpClient,private router: Router) { }
  readonly BaseURI = 'https://localhost:44385/api/';
//  readonly url = 'https://localhost:44337/api/ApplicationUser/AllUsers';
//  users:Users[];
 // users:Users[holla,holla@getMaxListeners.com];
//la structure de la formulaire
readonly rootURL = 'https://localhost:44385/api';
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
   
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]//required cad obligatoire
    }, { validator: this.comparePasswords })

  });

  FormModel = this.Fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
  });
//ici on doit confirme le password
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }
Valide:string="";
  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password,
      Valide:false
    };
   // return this.router.navigate(['./registration']);
//ApplicationUser/Register
 
   return this.http.post(this.BaseURI + 'ApplicationUser/Register', body);
  }
  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }


  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  formData: Users;
  user:Users;
  getUser(UserId){
    this.http.get('https://localhost:44385/api/Metier/Getuser/'+UserId).subscribe(
      res=>{
        console.log(res);
        this.user = res as Users;
       console.log(this.user);
     //  this.users = data.json();
      }
    ) 
  }
 
  refreshList(UserId){ 
    this.http.get(this.rootURL + '/Metier/Getuser/'+UserId)
   .toPromise()
   .then(res =>this.user= res as Users);
  }
  
  Modifier(){
    console.log(this.formData.email);
    return this.http.post(this.rootURL + '/ApplicationUser/Update', this.formData);
  }
}
