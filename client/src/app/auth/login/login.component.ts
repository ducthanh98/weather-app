import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    localStorage.removeItem('xxx-token');
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(
        (response: any) => {
          if (response.data) {
            localStorage.setItem('xxx-token', response.data);
            this.router.navigate(['/'])
          } else if (response.message) {

            this.toastrService.error(response.message, "Lỗi");

          } else {

            this.toastrService.error("Đã có lỗi xảy ra. Vui lòng thử lại sau", "Lỗi");

          }
        }
      )
  }

  ngOnDestroy() {
    this.authService.unsubcribe();
  }

}
