import { Component, inject } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";

import { ButtonConfiguration, FormActions } from "@shared/form-actions/form-actions.component";
import { AuthorService } from "@services/author.service";
import { Author } from "@features/author/entities/author.model";
import { AuthorDTO } from "@features/author/entities/author.dto";

@Component({
    selector: "author-register-page",
    imports: [
        NzButtonModule,
        NzCardModule,
        NzFormModule,
        NzInputModule,
        NzIconModule,
        ReactiveFormsModule,
        FormActions
    ],
    templateUrl: "./register.page.html",
    styleUrl: "./register.page.css",
})
export class AuthorRegisterPage {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly service = inject(AuthorService);
    private readonly formBuilder = inject(NonNullableFormBuilder);

    private id = this.route.snapshot.paramMap.get('id');

    formButtons: ButtonConfiguration[] = [
        {
            id: "add",
            label: this.id ? "Update" : "Create",
            type: "submit",
            color: "primary"
        }, {
            id: "cancel",
            label: "Cancel",
            type: "button",
            color: "default",
            onClick: this.handleCancel.bind(this)
        }
    ];

    authorForm = new FormGroup({
        name: this.formBuilder.control("", Validators.required),
    });

    ngOnInit() {
        if (this.id && this.id !== "") {
            this.service.getById(this.id).subscribe((dto: AuthorDTO) => {
                this.populateForm(new Author(dto));
            });
        }
    }

    populateForm(author: Author): void {
        this.authorForm.patchValue({
            name: author?.name,
        });
    }

    submitForm(): void {
        if (this.authorForm.valid) {
            const authorDto = this.authorForm.value as AuthorDTO;

            if(this.id) {
                this.service.update(this.id, authorDto).subscribe((author: AuthorDTO) => {
                    this.router.navigateByUrl("/library/author/listing");
                });
            } else {
                this.service.create(authorDto).subscribe((author: AuthorDTO) => {
                    this.router.navigateByUrl("/library/author/listing");
                });
            }
        } else {
            Object.values(this.authorForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    handleCancel(): void {
        this.router.navigateByUrl("/library/author/listing");
    }
}
