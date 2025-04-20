import { Routes } from '@angular/router';
import { UserLoginPage } from './features/user/pages/login/login.component';

import { WorkspaceLayout } from './layouts/workspace.layout';
import { BookSearchPage } from './features/book/pages/search/search.page';
import { BookRegisterPage } from './features/book/pages/register/register.page';

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
                path: "book/search",
                component: BookSearchPage,
            },
            {
                path: "book/register",
                component: BookRegisterPage,
            }
        ]
    },
];
