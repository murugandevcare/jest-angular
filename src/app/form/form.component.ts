import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn: boolean = false;
  constructor(private fb: FormBuilder, private auth:AuthService) { }

  ngOnInit(): void {
    this.initialSetup();
  }

  initialSetup(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('' ,[Validators.required])
    })
  }

  login(value: any){
    if(this.loginForm.valid){
     this.auth.login(value).subscribe({
      next: (data)=> {
          this.isLoggedIn = true;
          alert('Login successful.');
      },
      error: (err) => {
        this.isLoggedIn = false;
        alert('Login Fail')
      }
     })
    }
  }
}
