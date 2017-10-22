# @jupiter example application

Example application utilizing @ngrx libraries, showcasing common patterns and best practices.


This app is a book collection manager. The user can authenticate, use the Google Books API to search for
books and add them to their collection. This application utilizes [@jupiter/db](https://github.com/jupiter101/platform/modules/db)
to persist the collection across sessions; [@jupiter/store](https://github.com/jupiter101/platform/modules/store) to manage
the state of the app and to cache requests made to the Google Books API;
[@angular/router](https://github.com/angular/angular) to manage navigation between routes;
[@jupiter/effects](https://github.com/jupiter101/platform/modules/effects) to isolate side effects.

Built with [@angular/cli](https://github.com/angular/angular-cli)

### Included
 - [@ngrx/store](https://github.com/jupiter101/platform/modules/store) - RxJS powered state management for Angular apps, inspired by Redux
 - [@ngrx/effects](https://github.com/jupiter101/platform/modules/effects) - Side effect model for @jupiter/store
 - [@angular/router](https://github.com/angular/angular) - Angular Router
 - [@ngrx/db](https://github.com/jupiter101/platform/modules/db) - RxJS powered IndexedDB for Angular apps
 - [@ngrx/store-devtools](https://github.com/jupiter101/platform/modules/store-devtools) - Instrumentation for @jupiter/store enabling time-travel debugging
 - [jest](https://facebook.github.io/jest/) - JavaScript test runner with easy setup, isolated browser testing and snapshot testing

### Quick start

```bash
# clone the repo
git clone https://github.com/jupiter101/platform.git

# Install the dependencies:
yarn

# start the server
yarn run build && yarn run cli -- serve

# OR
yarn run example:start
```

Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser. To login, the username and password is `test`.
 

_NOTE:_ The above setup instructions assume you have added local npm bin folders to your path.
If this is not the case you will need to install the Angular CLI globally.
