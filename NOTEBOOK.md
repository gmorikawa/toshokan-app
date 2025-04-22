# Notebook

## Creating components in Angular

Like React and Vue, Angular is a javascript front-end framework that uses components as main building blocks. These components can be composed to create other components, this way, creating a clear separation of functionalities that are easier to maintain and grow.

```typescript
// user-profile.ts
@Component({
  selector: 'user-profile',
  template: `
    <h1>User profile</h1>
    <p>This is the user profile page</p>
  `,
  styles: `h1 { font-size: 3em; } `,
})
export class UserProfile { /* Your component code goes here */ }
```

In the decorator above we have the following properties:

* selector: defines how this component should be declared in other components;
* template: the HTML template that should be rendered. This can be substituted by `templateUrl` to pass a html file as template;
* styles: the CSS selectors available for this component. This can be substitued by `styleUrl` to pass a stylesheet (css, sass, scss) file.

### References

* [Composition with components • Angular](https://angular.dev/essentials/components), accessed on April 7, 2025;

## Folder Structure

### References

* [Angular Best Practices: Tips for Project Structure and Organization | by Thinkitive Inc | Medium](https://medium.com/@marketing_26756/angular-best-practices-tips-for-project-structure-and-organization-490ca7950829), accessed on April 7, 2025;

## Signals and Data Binding

The function `signal` can be used in component's class to represent a state. Is similar to React's `useState`.

```typescript
export class UserLoginPage {
    clicks = signal(0);

    onClick(e: MouseEvent) {
        // mutate state
        this.clicks.set(clicks.get() + 1);

        // mutate state based on current value
        this.clicks.update((current) => current + 1);
    }
}
```

To use this state in the template you can wrap the class property in double curly braces like in the example below:

```html
<p-card>
    <p-button (onClick)="onClick($event)">
        {{ clicks() }}
    </p-button>
</p-card>
```

## Accessing browser global objects in Angular

Accessing browser objects like `window` and `document` is possible, but not recommended to access them directly. A warning in the console of the application was being shown after starting it saying that `localStorage` could not be found. Which makes me wonder if Angular does execute server-side to validate some functionality.

Instead of referencing these browser objects directly, it is better to use Angular's dependency injection to ask for a instance of those objects. The following code shows how to use the `document` object:

```typescript
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export class TestComponent {
    private readonly document = inject(DOCUMENT);

    reloadPage(): void {
        this.document?.location?.reload();
    }
}
```

The same can be used to take the `window` object from `document`:

```typescript
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export class TestComponent {
    private readonly document = inject(DOCUMENT);
    private readonly window = this.document?.defaultView

    getLanguage(): string {
        return this.window?.navigator?.language
    }
}
```

OBS: examples from [this article](https://medium.com/@monsieur_ricky/accessing-browser-global-objects-in-angular-with-dependency-injection-3ebc9d764e84).

So here in my application, in order to use the `localStorage` from the browser, I have a storage service class with the following structure:

```typescript
import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private readonly document = inject(DOCUMENT);
    private readonly localStorage = this.document.defaultView?.localStorage;

    public saveData(key: string, value: string) {
        this.localStorage?.setItem(key, value);
    }

    public getData(key: string) {
        return this.localStorage?.getItem(key);
    }

    public removeData(key: string) {
        this.localStorage?.removeItem(key);
    }

    public clearData() {
        this.localStorage?.clear();
    }
}
```

Here, the `document` is injected and from it I read the `localStorage` from the `window` object. This service will be injected in other components that needs to use the browser storage.

### References

* [Accessing Browser Global Objects in Angular with Dependency Injection | by Ricky Lopes | Medium](https://medium.com/@monsieur_ricky/accessing-browser-global-objects-in-angular-with-dependency-injection-3ebc9d764e84), accessed on April 22, 2025;
