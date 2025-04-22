import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTableModule } from "ng-zorro-antd/table";

import { TopicService } from "@services/topic.service";
import { Topic } from "@features/topic/entities/topic.model";
import { TopicDTO } from "@features/topic/entities/topic.dto";

@Component({
    selector: "topic-listing-page",
    imports: [
        RouterLink,
        NzDividerModule,
        NzTableModule,
    ],
    templateUrl: "./listing.page.html",
    styleUrl: "./listing.page.css",
})
export class TopicListingPage {
    private service = inject(TopicService);

    topics = signal<Topic[]>([]);

    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        this.service.getAll().subscribe(topicsDto => {
            this.topics.set(topicsDto.map((dto) => new Topic(dto)));
        });
    }

    delete(id: string): void {
        this.service.remove(id).subscribe((topic: TopicDTO) => {
            this.loadData();
        });
    }
}
