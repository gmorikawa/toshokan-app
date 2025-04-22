import { Component, Input } from "@angular/core";

import { NzButtonModule } from "ng-zorro-antd/button";

type ButtonType = "button" | "submit" | "reset";
type ButtonColor = "primary" | "default" | "dashed" | "link" | "text" | null;

export interface ButtonConfiguration {
    id: string;
    label: string;
    icon?: string;
    type?: ButtonType;
    color?: ButtonColor;

    onClick?: (e: MouseEvent) => void;
}

@Component({
    selector: "form-actions",
    imports: [
        NzButtonModule,
    ],
    templateUrl: "./form-actions.component.html",
    styleUrl: "./form-actions.component.css",
})
export class FormActions {
    @Input() buttons: ButtonConfiguration[] = [];
}
