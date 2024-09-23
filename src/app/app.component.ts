import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,ReactiveFormsModule,HttpClientModule,CommonModule,AsyncPipe, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'reactivForm';
  myForm!: FormGroup;
  contryList$ :any;
  isSubmit : boolean = false;
  constructor(private fb: FormBuilder, private http:HttpClient) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      gender: ['', Validators.required],

      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postalcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
      }),
      terms: ['', Validators.required]
    })

    this.fetchCountryList()
  }

  onSubmit(){
    debugger
    this.isSubmit = true;

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched()
    }
  }
  fetchCountryList(){
      this.contryList$ =this.http.get('https://restcountries.com/v3.1/all').pipe(take(20))
  }

  get name (){
    return this.myForm.get('name')
  }
  get age(){
    return this.myForm.get('age')
  }
  get email(){
    return this.myForm.get('email')
  }
  get country() :any{
    return this.myForm.get('country')
  }
  get gender():any{
    return this.myForm.get('gender')
  }

  get street(){
    return this.myForm.get('address.street')
  }
  get city(){
    return this.myForm.get('address.city')
  }
  get postalcode(){
    return this.myForm.get('address.postalcode')
  }
}
