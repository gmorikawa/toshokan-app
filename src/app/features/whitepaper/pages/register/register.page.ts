import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";

import { Nullable } from "@common/types/helpers";

import { ButtonConfiguration, FormActions } from "@shared/form-actions/form-actions.component";

import { WhitepaperService } from "@services/whitepaper.service";
import { CategoryService } from "@services/category.service";
import { TopicService } from "@services/topic.service";

import { Whitepaper } from "@features/whitepaper/entities/whitepaper.model";
import { WhitepaperDTO } from "@features/whitepaper/entities/whitepaper.dto";
import { CategoryDTO } from "@features/category/entities/category.dto";
import { TopicDTO } from "@features/topic/entities/topic.dto";

@Component({
    selector: "whitepaper-register-page",
    templateUrl: "./register.page.html",
    styleUrl: "./register.page.css",
    imports: [
        NzButtonModule,
        NzCheckboxModule,
        NzCardModule,
        NzFormModule,
        NzInputModule,
        NzIconModule,
        NzSelectModule,
        ReactiveFormsModule,
        FormActions,
        CommonModule
    ]
})
export class WhitepaperRegisterPage {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly service = inject(WhitepaperService);
    private readonly categoryService = inject(CategoryService);
    private readonly topicService = inject(TopicService);
    private readonly formBuilder = inject(NonNullableFormBuilder);

    private id = this.route.snapshot.paramMap.get('id');

    readonly categories$ = this.categoryService.getAll();
    readonly topics$ = this.topicService.getAll();

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

    whitepaperForm = new FormGroup({
        title: this.formBuilder.control("", Validators.required),
        year: this.formBuilder.control("", Validators.required),
        authors: this.formBuilder.control<string[]>([]),
        description: this.formBuilder.control(""),
        category: this.formBuilder.control<Nullable<CategoryDTO>>(null, Validators.required),
        topics: this.formBuilder.control<TopicDTO[]>([]),
    });

    ngOnInit() {
        if (this.id && this.id !== "") {
            this.service.getById(this.id).subscribe((dto: WhitepaperDTO) => {
                console.log(dto);
                this.populateForm(new Whitepaper(dto));
            });
        }
    }

    populateForm(whitepaper: Whitepaper): void {
        this.whitepaperForm.patchValue({
            title: whitepaper?.title,
            year: whitepaper?.year?.toString(),
            description: whitepaper?.description,
            authors: whitepaper?.authors,
            category: whitepaper?.category,
            topics: whitepaper?.topics,
        });
    }

    categoryComparator(category1: CategoryDTO, category2: CategoryDTO): boolean {
        return category1?.id === category2?.id;
    }

    topicComparator(topic1: TopicDTO, topic2: TopicDTO): boolean {
        return topic1?.id === topic2?.id;
    }

    submitForm(): void {
        if (this.whitepaperForm.valid) {
            const whitepaperDto = this.whitepaperForm.value as unknown as WhitepaperDTO;

            if(this.id) {
                this.service.update(this.id, whitepaperDto).subscribe((whitepaper: WhitepaperDTO) => {
                    this.router.navigateByUrl("/library/whitepaper/search");
                });
            } else {
                this.service.create(whitepaperDto).subscribe((whitepaper: WhitepaperDTO) => {
                    this.router.navigateByUrl("/library/whitepaper/search");
                });
            }
        } else {
            Object.values(this.whitepaperForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    handleCancel(): void {
        this.router.navigateByUrl("/library/whitepaper/search");
    }
}