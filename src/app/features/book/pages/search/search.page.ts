import { Component } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
    selector: "book-search-page",
    templateUrl: "./search.page.html",
    styleUrl: "./search.page.css",
    imports: [
        NzButtonModule,
        NzCheckboxModule,
        NzCardModule,
        NzFormModule,
        NzInputModule,
        NzIconModule,
        ReactiveFormsModule,
    ]
})
export class BookSearchPage {
}