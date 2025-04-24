import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";

import { User } from "../../entities/user.model";
import { AuthService } from "../../../../../services/auth.service";
import { Router } from "@angular/router";
import { CredentialDTO } from "../../entities/credential.dto";
import { TokenDTO } from "../../entities/token.dto";
import { StorageService } from "../../../../../services/storage.service";

@Component({
    selector: "user-login-page",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
    imports: [
        NzButtonModule,
        NzCheckboxModule,
        NzCardModule,
        NzFormModule,
        NzInputModule,
        ReactiveFormsModule,
    ]
})
export class UserLoginPage {
    private formBuilder = inject(NonNullableFormBuilder);
    private service = inject(AuthService);
    private router = inject(Router);
    private storage = inject(StorageService);

    user = signal<User>(new User());

    loginForm = new FormGroup({
        username: this.formBuilder.control("", Validators.required),
        password: this.formBuilder.control("", Validators.required),
        remember: this.formBuilder.control(true)
    });

    submitForm(): void {
        if (this.loginForm.valid) {
            const credential = this.loginForm.value as CredentialDTO;
            
            this.service.login(credential).subscribe((token: TokenDTO) => {
                this.storage.saveData("access_token", token?.accessToken);

                this.router.navigateByUrl("/library/book/search");
            });
        } else {
            Object.values(this.loginForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }
}