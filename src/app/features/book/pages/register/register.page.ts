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
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzUploadFile, NzUploadModule } from "ng-zorro-antd/upload";

import { Nullable } from "@common/types/helpers";
import { ButtonConfiguration, FormActions } from "@shared/form-actions/form-actions.component";
import { BookService } from "@services/book.service";
import { StorageService } from "@services/storage.service";
import { CategoryService } from "@services/category.service";
import { PublisherService } from "@services/publisher.service";
import { TopicService } from "@services/topic.service";
import { Book } from "@features/book/entities/book.model";
import { BookDTO } from "@features/book/entities/book.dto";
import { CategoryDTO } from "@features/category/entities/category.dto";
import { PublisherDTO } from "@features/publisher/entities/publisher.dto";
import { TopicDTO } from "@features/topic/entities/topic.dto";
import { BehaviorSubject, switchMap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FileDTO } from '@features/file/entities/file.dto';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AuthorService } from "@services/author.service";
import { AuthorDTO } from "@features/author/entities/author.dto";
import { Author } from "@features/author/entities/author.model";
import { NzDividerModule } from "ng-zorro-antd/divider";

@Component({
    selector: "book-register-page",
    templateUrl: "./register.page.html",
    styleUrl: "./register.page.css",
    imports: [
        NzButtonModule,
        NzCheckboxModule,
        NzCardModule,
        NzDividerModule,
        NzFormModule,
        NzInputModule,
        NzIconModule,
        NzSelectModule,
        NzTableModule,
        NzTabsModule,
        NzUploadModule,
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
    private readonly authorService = inject(AuthorService);
    private readonly formBuilder = inject(NonNullableFormBuilder);
    private readonly storage = inject(StorageService);

    uploading = false;
    fileList: NzUploadFile[] = [];

    id = this.route.snapshot.paramMap.get('id');

    readonly categories$ = this.categoryService.getAll();
    readonly publishers$ = this.publisherService.getAll();
    readonly topics$ = this.topicService.getAll();

    readonly refreshAuthors$ = new BehaviorSubject<void>(undefined);
    readonly authors$ = this.refreshAuthors$.pipe(switchMap(() => this.authorService.getAll()));

    readonly refresh$ = new BehaviorSubject<void>(undefined);
    readonly files$ = this.refresh$.pipe(switchMap(() => this.service.getFiles(this.id)));

    headers = {
        Authorization: this.storage.getData("access_token") ?? ""
    };

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
        title: this.formBuilder.control<string>("", Validators.required),
        year: this.formBuilder.control<Nullable<number>>(null, Validators.required),
        authors: this.formBuilder.control<AuthorDTO[]>([]),
        description: this.formBuilder.control<string>(""),
        category: this.formBuilder.control<Nullable<CategoryDTO>>(null, Validators.required),
        publisher: this.formBuilder.control<Nullable<PublisherDTO>>(null),
        isbn: this.formBuilder.control<string>("", Validators.required),
        topics: this.formBuilder.control<TopicDTO[]>([]),
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
            year: book?.year,
            description: book?.description,
            authors: book?.authors,
            category: book?.category,
            publisher: book?.publisher,
            isbn: book?.isbn,
            topics: book?.topics
        });
    }

    categoryComparator(category1: CategoryDTO, category2: CategoryDTO): boolean {
        return category1?.id === category2?.id;
    }

    topicComparator(topic1: TopicDTO, topic2: TopicDTO): boolean {
        return topic1?.id === topic2?.id;
    }

    authorComparator(author1: AuthorDTO, author2: AuthorDTO): boolean {
        return author1?.id === author2?.id;
    }

    publisherComparator(publisher1: PublisherDTO, publisher2: PublisherDTO): boolean {
        return publisher1?.id === publisher2?.id;
    }

    submitForm(): void {
        if (this.bookForm.valid) {
            const bookDto = this.bookForm.value as unknown as BookDTO;

            if (this.id) {
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

    beforeUpload = (file: NzUploadFile): boolean => {
        this.fileList = this.fileList.concat(file);
        return false;
    };

    handleUpload(): void {
        this.uploading = true;

        this.fileList.forEach((file: any) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append("description", "Random text");

            this.service.upload(this.id as string, formData)
                .subscribe({
                    next: () => {
                        this.uploading = false;
                        this.fileList = [];
                        console.log('upload successfully.');
                        this.refresh$.next();
                    },
                    error: () => {
                        this.uploading = false;
                        console.log('upload failed.');
                    }
                });
        });
    }

    handleDownload(id: string, file: FileDTO): void {
        this.service.download(id, file.id)
            .subscribe((response: HttpResponse<Blob>) => {
                if (response?.body) {
                    const a = document.createElement("a");
                    document.body.appendChild(a);
                    const url = window.URL.createObjectURL(response?.body);
                    a.href = url;
                    a.download = file.filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    a.remove();
                }
            });
    }

    addItem(input: HTMLInputElement): void {
        const value = input.value;
        
        this.authorService.create({ name: value } as AuthorDTO).subscribe((author) => {
            this.refreshAuthors$.next();
        });
    }
}