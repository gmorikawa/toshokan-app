import { Routes } from '@angular/router';
import { UserLoginPage } from './features/user/pages/login/login.component';

import { WorkspaceLayout } from './layouts/workspace.layout';
import { DocumentSearchPage } from './features/document/pages/search/search.page';

export const routes: Routes = [
    {
        path: "login",
        component: UserLoginPage
    },
    {
        path: "library",
        component: WorkspaceLayout,
        children: [
            {
                path: "document/search",
                component: DocumentSearchPage,
            }
        ]
    },
];
