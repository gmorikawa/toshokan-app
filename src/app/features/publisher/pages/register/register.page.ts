import { Component, inject } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";

import { PublisherService } from "@services/publisher.service";
import { ButtonConfiguration, FormActions } from "@app/shared/form-actions/form-actions.component";
import { Publisher } from "@features/publisher/entities/publisher.model";
import { PublisherDTO } from "@features/publisher/entities/publisher.dto";

@Component({
    selector: "publisher-register-page",
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
export class PublisherRegisterPage {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly service = inject(PublisherService);
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

    publisherForm = new FormGroup({
        name: this.formBuilder.control("", Validators.required),
    });

    ngOnInit() {
        if (this.id && this.id !== "") {
            this.service.getById(this.id).subscribe((dto: PublisherDTO) => {
                this.populateForm(new Publisher(dto));
            });
        }
    }

    populateForm(publisher: Publisher): void {
        this.publisherForm.patchValue({
            name: publisher?.name,
        });
    }

    submitForm(): void {
        if (this.publisherForm.valid) {
            const publisherDto = this.publisherForm.value as PublisherDTO;

            if(this.id) {
                this.service.update(this.id, publisherDto).subscribe((publisher: PublisherDTO) => {
                    this.router.navigateByUrl("/library/publisher/listing");
                });
            } else {
                this.service.create(publisherDto).subscribe((publisher: PublisherDTO) => {
                    this.router.navigateByUrl("/library/publisher/listing");
                });
            }
        } else {
            Object.values(this.publisherForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    handleCancel(): void {
        this.router.navigateByUrl("/library/publisher/listing");
    }
}
