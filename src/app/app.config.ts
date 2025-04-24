import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideNzIcons } from "ng-zorro-antd/icon";

import { routes } from "./app.routes";
import { en_US, provideNzI18n } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { FormsModule } from "@angular/forms";

import { UserOutline, LockOutline } from "@ant-design/icons-angular/icons";

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideClientHydration(withEventReplay()),
        provideAnimationsAsync(), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(),
        [provideNzIcons([UserOutline, LockOutline])]
    ]
};
