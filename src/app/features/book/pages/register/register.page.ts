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

import { ButtonConfiguration, FormActions } from "@shared/form-actions/form-actions.component";
import { BookService } from "@services/book.service";
import { Book } from "@features/book/entities/book.model";
import { BookDTO } from "@features/book/entities/book.dto";
import { CategoryService } from "@services/category.service";
import { PublisherService } from "@services/publisher.service";
import { TopicService } from "@services/topic.service";

@Component({
    selector: "book-register-page",
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
export class BookRegisterPage {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly service = inject(BookService);
    private readonly categoryService = inject(CategoryService);
    private readonly publisherService = inject(PublisherService);
    private readonly topicService = inject(TopicService);
    private readonly formBuilder = inject(NonNullableFormBuilder);

    private id = this.route.snapshot.paramMap.get('id');

    readonly categories$ = this.categoryService.getAll();
    readonly publishers$ = this.publisherService.getAll();
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

    bookForm = new FormGroup({
        title: this.formBuilder.control("", Validators.required),
        year: this.formBuilder.control("", Validators.required),
        authors: this.formBuilder.control(""),
        description: this.formBuilder.control(""),
        category: this.formBuilder.control(null, Validators.required),
        publisher: this.formBuilder.control(null),
        isbn: this.formBuilder.control("", Validators.required),
        topics: this.formBuilder.control([]),
    });

    ngOnInit() {
        if (this.id && this.id !== "") {
            this.service.getById(this.id).subscribe((dto: BookDTO) => {
                this.populateForm(new Book(dto));
            });
        }
    }

    populateForm(book: Book): void {
        this.bookForm.patchValue({
            title: book?.title,
        });
    }

    submitForm(): void {
        if (this.bookForm.valid) {
            const bookDto = this.bookForm.value as unknown as BookDTO;

            if(this.id) {
                this.service.update(this.id, bookDto).subscribe((book: BookDTO) => {
                    this.router.navigateByUrl("/library/book/search");
                });
            } else {
                this.service.create(bookDto).subscribe((book: BookDTO) => {
                    this.router.navigateByUrl("/library/book/search");
                });
            }
        } else {
            Object.values(this.bookForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    handleCancel(): void {
        this.router.navigateByUrl("/library/book/search");
    }
}