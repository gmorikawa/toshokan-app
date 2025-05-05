import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTableModule } from "ng-zorro-antd/table";

import { AuthorService } from "@services/author.service";
import { Author } from "@features/author/entities/author.model";
import { AuthorDTO } from "@features/author/entities/author.dto";

@Component({
    selector: "author-listing-page",
    imports: [
        RouterLink,
        NzDividerModule,
        NzTableModule,
    ],
    templateUrl: "./listing.page.html",
    styleUrl: "./listing.page.css",
})
export class AuthorListingPage {
    private service = inject(AuthorService);

    authors = signal<Author[]>([]);

    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        this.service.getAll().subscribe(authorsDto => {
            this.authors.set(authorsDto.map((dto) => new Author(dto)));
        });
    }

    delete(id: string): void {
        this.service.remove(id).subscribe((author: AuthorDTO) => {
            this.loadData();
        });
    }
}
