import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzTableModule } from "ng-zorro-antd/table";

import { BookService } from "@services/book.service";
import { Book } from "@features/book/entities/book.model";
import { BookDTO } from "@features/book/entities/book.dto";

@Component({
    selector: "book-search-page",
    imports: [
        RouterLink,
        NzDividerModule,
        NzTableModule,
    ],
    templateUrl: "./search.page.html",
    styleUrl: "./search.page.css",
})
export class BookSearchPage {
    private service = inject(BookService);

    books = signal<Book[]>([]);

    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        this.service.getAll().subscribe(booksDto => {
            this.books.set(booksDto.map((dto) => new Book(dto)));
        });
    }

    delete(id: string): void {
        this.service.remove(id).subscribe((topic: BookDTO) => {
            this.loadData();
        });
    }
}