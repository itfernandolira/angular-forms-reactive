import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  forbiddenUsernames = ['Anna','Chris'];

  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null,[Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null,[Validators.required,Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
/*     this.signupForm.valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    ); */
    this.signupForm.statusChanges.subscribe(
      (status) => {
        console.log(status);
      }
    );
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl) {
    if (this.forbiddenUsernames.indexOf(control.value) != -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
}
