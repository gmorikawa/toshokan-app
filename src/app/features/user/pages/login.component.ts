import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: "user-login-page",
    templateUrl: "./login.component.html",
    imports: [
        ButtonModule,
        CardModule,
        InputTextModule,
        ReactiveFormsModule,
    ]
})
export class UserLoginPage {
    loginForm = new FormGroup({
        username: new FormControl(""),
        password: new FormControl("")
    });
}