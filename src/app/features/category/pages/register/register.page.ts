import { Component, inject } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";

import { CategoryService } from "@services/category.service";
import { ButtonConfiguration, FormActions } from "@shared/form-actions/form-actions.component";
import { Category } from "@features/category/entities/category.model";
import { CategoryDTO } from "@features/category/entities/category.dto";

@Component({
    selector: "category-register-page",
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
export class CategoryRegisterPage {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly service = inject(CategoryService);
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

    categoryForm = new FormGroup({
        name: this.formBuilder.control("", Validators.required),
    });

    ngOnInit() {
        if (this.id && this.id !== "") {
            this.service.getById(this.id).subscribe((dto: CategoryDTO) => {
                this.populateForm(new Category(dto));
            });
        }
    }

    populateForm(category: Category): void {
        this.categoryForm.patchValue({
            name: category?.name,
        });
    }

    submitForm(): void {
        if (this.categoryForm.valid) {
            const categoryDto = this.categoryForm.value as CategoryDTO;

            if(this.id) {
                this.service.update(this.id, categoryDto).subscribe((category: CategoryDTO) => {
                    this.router.navigateByUrl("/library/category/listing");
                });
            } else {
                this.service.create(categoryDto).subscribe((category: CategoryDTO) => {
                    this.router.navigateByUrl("/library/category/listing");
                });
            }
        } else {
            Object.values(this.categoryForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    handleCancel(): void {
        this.router.navigateByUrl("/library/category/listing");
    }
}
