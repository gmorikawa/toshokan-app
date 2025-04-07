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
