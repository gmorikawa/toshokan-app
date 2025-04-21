import { Routes } from '@angular/router';
import { UserLoginPage } from './features/user/pages/login/login.component';

import { WorkspaceLayout } from './layouts/workspace.layout';
import { BookSearchPage } from './features/book/pages/search/search.page';
import { BookRegisterPage } from './features/book/pages/register/register.page';
import { TopicListingPage } from './features/topic/pages/listing/listing.page';
import { TopicRegisterPage } from './features/topic/pages/register/register.page';

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
            },
            {
                path: "topic/listing",
                component: TopicListingPage
            },
            {
                path: "topic/register/:id",
                component: TopicRegisterPage
            },
            {
                path: "topic/register",
                component: TopicRegisterPage
            },
        ]
    },
];
