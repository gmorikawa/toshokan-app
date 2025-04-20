import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";

@Component({
    selector: "workspace-layout",
    imports: [
        RouterOutlet,
        NzBreadCrumbModule,
        NzIconModule,
        NzMenuModule,
        NzLayoutModule
    ],
    templateUrl: "./workspace.layout.html",
    styleUrl: "./workspace.layout.css",
})
export class WorkspaceLayout {
    isCollapsed = false;
}