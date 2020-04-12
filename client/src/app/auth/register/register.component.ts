import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  signup() {
    this.authService.register(this.registerForm.value)
      .subscribe(
        (response: any) => {

          if (response.data) {
            this.toastrService.success("Thành công");


            setTimeout(() => {
              this.router.navigate(['/signin']);
            }, 1500);


          } else if (response.message) {

            this.toastrService.error(response.message,"Lỗi");

          } else{

            this.toastrService.error("Đã có lỗi xảy ra. Vui lòng thử lại sau","Lỗi");

          }

        }
      )

  }


}
