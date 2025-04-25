import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTableModule } from "ng-zorro-antd/table";

import { WhitepaperService } from "@services/whitepaper.service";
import { Whitepaper } from "@features/whitepaper/entities/whitepaper.model";
import { WhitepaperDTO } from "@features/whitepaper/entities/whitepaper.dto";

@Component({
    selector: "whitepaper-search-page",
    imports: [
        RouterLink,
        NzDividerModule,
        NzTableModule,
    ],
    templateUrl: "./search.page.html",
    styleUrl: "./search.page.css",
})
export class WhitepaperSearchPage {
    private service = inject(WhitepaperService);

    whitepapers = signal<Whitepaper[]>([]);

    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        this.service.getAll().subscribe(whitepapersDto => {
            this.whitepapers.set(whitepapersDto.map((dto) => new Whitepaper(dto)));
        });
    }

    delete(id: string): void {
        this.service.remove(id).subscribe((topic: WhitepaperDTO) => {
            this.loadData();
        });
    }
}