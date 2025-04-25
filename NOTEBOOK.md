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

## Angular and server-side rendering lifecycle

Sometimes angular does some code execution on server-side. For exemple, some services classes are throwing request errors of 403 because the server does not hold authorization information (access token).

In the client side the table component remains in the screen with the following error:

```javascript
core.mjs:20750 Angular is running in development mode.
main.ts:5 ERROR RuntimeError: NG0500: During hydration Angular expected <tbody> but the node was not found.

Angular expected this DOM:

  …
  <thead>…</thead>
  <tbody>…</tbody>  <-- AT THIS LOCATION
  …


Note: attributes are only displayed to better represent the DOM but have no effect on hydration mismatches.

To fix this problem:
  * check the "_BookSearchPage" component for hydration-related issues
  * check to see if your template has valid HTML structure
  * or skip hydration by adding the `ngSkipHydration` attribute to its host node in a template

 Find more at https://angular.dev/errors/NG0500
    at validateMatchingNode (core.mjs:14523:11)
    at locateOrCreateElementNodeImpl (core.mjs:27173:16)
    at Module.ɵɵelementStart (core.mjs:27076:18)
    at BookSearchPage_Template (search.page.html:12:5)
    at executeTemplate (core.mjs:11990:5)
    at renderView (core.mjs:12476:7)
    at renderComponent (core.mjs:12421:3)
    at renderChildComponents (core.mjs:12522:5)
    at renderView (core.mjs:12504:7)
    at ComponentFactory2.create (core.mjs:17416:9)
handleError @ core.mjs:6514
(anonymous) @ core.mjs:6528
invoke @ zone.js:369
run @ zone.js:111
runOutsideAngular @ core.mjs:6264
(anonymous) @ core.mjs:6528
tickImpl @ core.mjs:22951
_tick @ core.mjs:22932
tick @ core.mjs:22921
(anonymous) @ core.mjs:33850
invoke @ zone.js:369
onInvoke @ core.mjs:6368
invoke @ zone.js:368
run @ zone.js:111
run @ core.mjs:6220
next @ core.mjs:33849
ConsumerObserver2.next @ Subscriber.js:90
Subscriber2._next @ Subscriber.js:59
Subscriber2.next @ Subscriber.js:32
(anonymous) @ Subject.js:41
errorContext @ errorContext.js:23
Subject2.next @ Subject.js:31
emit @ core.mjs:5907
checkStable @ core.mjs:6287
onHasTask @ core.mjs:6394
hasTask @ zone.js:422
_updateTaskCount @ zone.js:443
_updateTaskCount @ zone.js:264
runTask @ zone.js:177
drainMicroTaskQueue @ zone.js:581
Promise.then
nativeScheduleMicroTask @ zone.js:557
scheduleMicroTask @ zone.js:568
scheduleTask @ zone.js:391
onScheduleTask @ core.mjs:6032
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:271
scheduleTask @ zone.js:382
scheduleTask @ zone.js:205
scheduleMicroTask @ zone.js:225
scheduleResolveOrReject @ zone.js:2528
then @ zone.js:2733
runInitializers @ core.mjs:22572
(anonymous) @ core.mjs:34802
_callAndReportToErrorHandler @ core.mjs:34846
(anonymous) @ core.mjs:34800
invoke @ zone.js:369
onInvoke @ core.mjs:6368
invoke @ zone.js:368
run @ zone.js:111
run @ core.mjs:6220
bootstrap @ core.mjs:34756
internalCreateApplication @ core.mjs:37059
bootstrapApplication @ browser-6JTYoVGl.mjs:439
(anonymous) @ main.ts:5
core.mjs:20750 Angular hydrated 36 component(s) and 251 node(s), 0 component(s) were skipped. Learn more at https://angular.dev/guide/hydration.
browser.mjs:1624 Warning: The animation trigger "collapseMotion" is attempting to animate the following not animatable properties: overflow
(to check the list of all animatable properties visit https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)
checkNonAnimatableInTimelines @ browser.mjs:1624
build @ browser.mjs:1573
_buildInstruction @ browser.mjs:2503
(anonymous) @ browser.mjs:2709
_flushAnimations @ browser.mjs:2682
flush @ browser.mjs:2578
flush @ browser.mjs:3398
(anonymous) @ browser.mjs:4028
invoke @ zone.js:369
run @ zone.js:111
runOutsideAngular @ core.mjs:6264
end @ browser.mjs:4026
end @ async.mjs:116
detectChangesInternal @ core.mjs:13503
detectChangesInViewIfRequired @ core.mjs:23178
synchronizeOnce @ core.mjs:23005
synchronize @ core.mjs:22974
tickImpl @ core.mjs:22943
_tick @ core.mjs:22932
tick @ core.mjs:22921
(anonymous) @ core.mjs:33850
invoke @ zone.js:369
onInvoke @ core.mjs:6368
invoke @ zone.js:368
run @ zone.js:111
run @ core.mjs:6220
next @ core.mjs:33849
ConsumerObserver2.next @ Subscriber.js:90
Subscriber2._next @ Subscriber.js:59
Subscriber2.next @ Subscriber.js:32
(anonymous) @ Subject.js:41
errorContext @ errorContext.js:23
Subject2.next @ Subject.js:31
emit @ core.mjs:5907
checkStable @ core.mjs:6287
(anonymous) @ core.mjs:6323
(anonymous) @ core.mjs:6010
timer @ zone.js:1809
invokeTask @ zone.js:402
runTask @ zone.js:159
invokeTask @ zone.js:483
ZoneTask.invoke @ zone.js:472
data.args.<computed> @ zone.js:1778
requestAnimationFrame
scheduleTask @ zone.js:1780
scheduleTask @ zone.js:388
scheduleTask @ zone.js:205
scheduleMacroTask @ zone.js:228
scheduleMacroTaskWithCurrentZone @ zone.js:691
(anonymous) @ zone.js:1834
proto.<computed> @ zone.js:1003
scheduleCallbackWithRafRace @ core.mjs:6009
scheduleCheckStable @ core.mjs:6319
(anonymous) @ core.mjs:6333
invoke @ zone.js:369
run @ zone.js:111
delayChangeDetectionForEvents @ core.mjs:6332
delayChangeDetectionForEventsDelegate @ core.mjs:6340
onInvokeTask @ core.mjs:6360
invokeTask @ zone.js:401
runTask @ zone.js:159
invokeTask @ zone.js:483
invokeTask @ zone.js:1138
globalCallback @ zone.js:1169
globalZoneAwareCallback @ zone.js:1202
```

On the server side the following error appears:

```javascript
ERROR HttpErrorResponse {
  headers: _HttpHeaders {
    headers: undefined,
    normalizedNames: Map(0) {},
    lazyInit: [Function (anonymous)],
    lazyUpdate: null
  },
  status: 403,
  statusText: 'Forbidden',
  url: 'http://localhost:8080/api/books',
  ok: false,
  type: undefined,
  name: 'HttpErrorResponse',
  message: 'Http failure response for http://localhost:8080/api/books: 403 Forbidden',
  error: null
}
```
