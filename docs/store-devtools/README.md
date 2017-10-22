# @jupiter/store-devtools

Devtools for [@jupiter/store](../store/README.md).

### Installation
Install @ngrx/store-devtools from npm:

`npm install @jupiter/store-devtools --save` OR `yarn add @jupiter/store-devtools`


### Nightly builds

`npm install github:jupiter101/store-devtools-builds` OR `yarn add github:jupiter101/store-devtools-builds`


## Instrumentation
### Instrumentation with the Chrome / Firefox Extension

1. Download the [Redux Devtools Extension](http://zalmoxisus.github.io/redux-devtools-extension/)

2. In your `AppModule` add instrumentation to the module imports using `StoreDevtoolsModule.instrument`:

```ts
import { StoreDevtoolsModule } from '@jupiter/store-devtools';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ]
})
export class AppModule { }
```
