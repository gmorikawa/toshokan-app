import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTableModule } from "ng-zorro-antd/table";

import { PublisherService } from "@services/publisher.service";
import { Publisher } from "@features/publisher/entities/publisher.model";
import { PublisherDTO } from "@features/publisher/entities/publisher.dto";

@Component({
    selector: "publisher-listing-page",
    imports: [
        RouterLink,
        NzDividerModule,
        NzTableModule,
    ],
    templateUrl: "./listing.page.html",
    styleUrl: "./listing.page.css",
})
export class PublisherListingPage {
    private service = inject(PublisherService);

    publishers = signal<Publisher[]>([]);

    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        this.service.getAll().subscribe(publishersDto => {
            this.publishers.set(publishersDto.map((dto) => new Publisher(dto)));
        });
    }

    delete(id: string): void {
        this.service.remove(id).subscribe((publisher: PublisherDTO) => {
            this.loadData();
        });
    }
}
