import { Routes } from "@angular/router";

import { WorkspaceLayout } from "@layouts/workspace.layout";

import { UserLoginPage } from "@features/user/pages/login/login.component";

import { BookSearchPage } from "@features/book/pages/search/search.page";
import { BookRegisterPage } from "@features/book/pages/register/register.page";

import { WhitepaperSearchPage } from "@features/whitepaper/pages/search/search.page";
import { WhitepaperRegisterPage } from "@features/whitepaper/pages/register/register.page";

import { PublisherListingPage } from "@features/publisher/pages/listing/listing.page";
import { PublisherRegisterPage } from "@features/publisher/pages/register/register.page";

import { AuthorListingPage } from "@features/author/pages/listing/listing.page";
import { AuthorRegisterPage } from "@features/author/pages/register/register.page";

import { CategoryListingPage } from "@features/category/pages/listing/listing.page";
import { CategoryRegisterPage } from "@features/category/pages/register/register.page";

import { TopicListingPage } from "@features/topic/pages/listing/listing.page";
import { TopicRegisterPage } from "@features/topic/pages/register/register.page";

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
                path: "book/register/:id",
                component: BookRegisterPage,
            },
            {
                path: "whitepaper/search",
                component: WhitepaperSearchPage,
            },
            {
                path: "whitepaper/register",
                component: WhitepaperRegisterPage,
            },
            {
                path: "whitepaper/register/:id",
                component: WhitepaperRegisterPage,
            },
            {
                path: "publisher/listing",
                component: PublisherListingPage
            },
            {
                path: "publisher/register",
                component: PublisherRegisterPage
            },
            {
                path: "publisher/register/:id",
                component: PublisherRegisterPage
            },
            {
                path: "author/listing",
                component: AuthorListingPage
            },
            {
                path: "author/register",
                component: AuthorRegisterPage
            },
            {
                path: "author/register/:id",
                component: AuthorRegisterPage
            },
            {
                path: "category/listing",
                component: CategoryListingPage
            },
            {
                path: "category/register",
                component: CategoryRegisterPage
            },
            {
                path: "category/register/:id",
                component: CategoryRegisterPage
            },
            {
                path: "topic/listing",
                component: TopicListingPage
            },
            {
                path: "topic/register",
                component: TopicRegisterPage
            },
            {
                path: "topic/register/:id",
                component: TopicRegisterPage
            },
        ]
    },
];
