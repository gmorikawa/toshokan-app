import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTableModule } from "ng-zorro-antd/table";

import { CategoryService } from "@services/category.service";
import { Category } from "@features/category/entities/category.model";
import { CategoryDTO } from "@features/category/entities/category.dto";

@Component({
    selector: "category-listing-page",
    imports: [
        RouterLink,
        NzDividerModule,
        NzTableModule,
    ],
    templateUrl: "./listing.page.html",
    styleUrl: "./listing.page.css",
})
export class CategoryListingPage {
    private service = inject(CategoryService);

    categories = signal<Category[]>([]);

    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        this.service.getAll().subscribe(categoriesDto => {
            this.categories.set(categoriesDto.map((dto) => new Category(dto)));
        });
    }

    delete(id: string): void {
        this.service.remove(id).subscribe((category: CategoryDTO) => {
            this.loadData();
        });
    }
}
