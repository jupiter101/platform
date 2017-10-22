// tslint:disable:no-trailing-whitespace
// tslint:disable:no-inferrable-types
import 'reflect-metadata';

console.log('########  1. Class decorator / Multiple decorators');
// 1. Class decorator / Multiple decorators
function simpleFirstClassDecorator(constructor: Function) {
  console.log('simpleFirstClassDecorator called.');
}

function simpleSecondClassDecorator(constructor: Function) {
  console.log('simpleSecondClassDecorator called.');
  constructor('test1');
}

// Decorators are evaluated in the order they appear in the code, but are then called in reverse order.
@simpleFirstClassDecorator //called second
@simpleSecondClassDecorator //called first
class ClassWithSimpleClassDecorator {
  constructor(test: string) {
    console.log(`constructor called: ${test}`);
  }
}

let instance_1 = new ClassWithSimpleClassDecorator('test2');
let instance_2 = new ClassWithSimpleClassDecorator('test3');
console.log(`instance_1: ${instance_1}`);
console.log(`instance_2 : ${instance_2}`);

/*
2. Decorator factories
In order to allow for decorators to accept parameters, we need to use what is known as a
decorator factory. A decorator factory is simply a wrapper function that returns the decorator
function itself.
There are a few things to note about decorator factories. Firstly, the decorator function itself will
still be called by the JavaScript runtime with automatically populated parameters. Secondly, the
decorator factory must return a function definition. Lastly, the parameters defined for the
decorator factory can be used within the decorator function itself.
 */
console.log('\n########  2. Decorator factories');

function decoratorFactory(name: string) {
  return (constructor: Function) =>
    console.log(`decorator function called with : ${name}`);
}

@decoratorFactory('testName')
class ClassWithDecoratorFactory {}

/*
3. Class decorator parameters

 */
console.log('\n########  3. Class decorator parameters');
function classConstructorDec(constructor: Function) {
  console.log(`constructor : ${constructor}`);
  console.log(`constructor.name : ${(<any>constructor).name}`);
  constructor.prototype.testProperty = 'testProperty_value';
}
@classConstructorDec
class ClassWithConstructor {}

let classConstrInstance = new ClassWithConstructor();
console.log(
  `classConstrInstance.testProperty : ` +
    `${(<any>classConstrInstance).testProperty}`
);

/*
4. Property decorators
Property decorators are decorator functions that can be used on class properties. A property
decorator is called with two parameters--the class prototype itself, and the property name.
 */
console.log('\n########  4. Property decorators');

function propertyDec(target: any, propertyKey: string) {
  console.log(`target : ${target}`);
  console.log(`target.constructor : ${target.constructor}`);
  if (typeof target === 'function') {
    console.log(`class name : ${target.name}`);
  } else {
    console.log(`class name : ${target.constructor.name}`);
  }

  console.log(`propertyKey : ${propertyKey}`);
}
class ClassWithPropertyDec {
  @propertyDec name: string;
}

/*
5. Static property decorators
Note here that the target argument (as printed in the first line of output) is not a class prototype
(as seen before), but an actual constructor function. The definition of this target.constructor
is then simply a function, named Function.
 */
console.log('\n########  5. Static property decorators');
class ClassWithStaticPropertyDec {
  @propertyDec static myName: string;
}

/*
6. Method decorators
Method decorators are decorators that can be applied to a method on a class. Method decorators
are invoked by the JavaScript runtime with three parameters. Remember that class decorators
have only a single parameter (the class prototype) and property decorators have two parameters
(the class prototype and the property name). Method decorators have three parameters--the class
prototype, the method name, and (optionally) a method descriptor. The third parameter, the
method descriptor is only populated if compiling for ES5 and above.

Here, we define a method decorator named methodDec that accepts our three parameters,
target, methodName, and descriptor. Note that the descriptor property has been marked as
optional. The first two lines inside the decorator simply log the values of target and methodName
to the console. Note, however, the last line of this decorator. Here, we are logging the value of
target[methodName] to the console. This will log the actual function definition to the console.
 */
console.log('\n########  6. Method decorators');

function methodDec(
  target: any,
  methodName: string,
  descriptor?: PropertyDescriptor
) {
  console.log(`target: ${target}`);
  console.log(`methodName : ${methodName}`);
  console.log(`target[methodName] : ${target[methodName]}`);
}

class ClassWithMethodDec {
  @methodDec
  print(output: string) {
    console.log(`ClassWithMethodDec.print` + `(${output}) called.`);
  }
}

/*
7. Using method decorators
Since we have the definition of a function available to us within a method decorator, we could
use the decorator to inject new functionality into the class. Suppose that we wanted to create an
audit trail of some sort, and log a message to the console every time a method was called. This is
the perfect scenario for method decorators.

Here we define a method decorator named auditLogDec. Within this decorator, we are
creating a variable named originalFunction to hold the definition of the method that we are
decorating. Remember that target[methodName] returns the function definition itself. We then
create a new function named auditFunction. The first line of this function logs a message to the
console. Note, however, the last line of the auditFunction function. We are using the JavaScript
apply function to call the original function, passing in the this parameter, and the arguments
parameter.
The last line of the auditLogDec decorator function is assigning this new function to the original
class function. In essence, this is wrapping the original function with a new function, and then
calling through to the original class function.
 */
console.log('\n########  7. Using method decorators');

function auditLogDec(
  target: any,
  methodName: string,
  descriptor?: PropertyDescriptor
): MethodDecorator {
  // console.log(`target: ${target}`);
  // console.log(`methodName : ${methodName}`);
  // console.log(`target[methodName] : ${target[methodName]}`);
  // console.log(`PropertyDescriptor : ${descriptor}`);
  // console.log(descriptor);
  let originalFunction = target[methodName];
  return (target[methodName] = function(t: any, m: string) {
    // console.log(`target: ${target}`);
    console.log(`auditLogDec : overide of ` + ` ${methodName} called `);
    originalFunction.apply(this, arguments);
  });
}

class ClassWithAuditDec {
  @auditLogDec
  print(output: string) {
    console.log(`ClassWithAuditDec.print` + `(${output}) called.`);
  }
}
let auditClass = new ClassWithAuditDec();
auditClass.print('test');

/*
8. Parameter decorators
Parameter decorators are
used to decorate the parameters of a particular method.

Here, we define a function named parameterDec, with three arguments. The target
argument will contain the class prototype as we have seen before. The methodName argument will
contain the name of the method that contains the parameter, and the parameterIndex argument
will contain the index of the parameter.
This print function has a single argument named value which is of type string. We have decorated
this value parameter with the parameterDec decorator. Note that the syntax for using a
parameter decorator ( @parameterDec ) is the same as any other decorator.
 */
console.log('\n########  8. Parameter decorators');

function parameterDec(target: any, methodName: string, parameterIndex: number) {
  console.log(`target: ${target}`);
  console.log(`methodName : ${methodName}`);
  console.log(`parameterIndex : ${parameterIndex}`);
}

class ClassWithParamDec {
  print(@parameterDec value: string) {}
}

/*
9. Decorator metadata / Using decorator metadata
The TypeScript compiler also includes experimental support for something called decorator
metadata. Decorator metadata is metadata that is generated on class definitions in order to
supplement the information that is passed into decorators. This option is called
emitDecoratorMetadata, and can be added to the tsconfig.json file.

In order to use this extra information within a decorator, we will need to use a third-party library
named reflect-metadata. We will discuss how to use third-party libraries in detail in future
chapters, but for the time being, this library can be included in our project by typing the
following from the command line:
npm install reflect-metadata --save-dev
npm install @types/reflect-metadata --save-dev

Once this has been installed, we will need to reference it in our TypeScript file by including the
following line at the top of the file:
import 'reflect-metadata';

Metadata that is generated automatically by the TypeScript compiler, and that can be read and
interrogated at runtime can be extremely useful. In other languages, such as C#, this type of
metadata information is called reflection, and is a fundamental principle when writing
frameworks for dependency injection, or for generating code analysis tools.
 */
console.log('\n########  9. Decorator metadata / Using decorator metadata');

function metadataParameterDec(
  target: any,
  methodName: string,
  parameterIndex: number
) {
  let designType = Reflect.getMetadata('design:type', target, methodName);
  console.log(`designType: ${designType}`);
  let designParamTypes = Reflect.getMetadata(
    'design:paramtypes',
    target,
    methodName
  );
  console.log(`paramtypes : ${designParamTypes}`);
  let designReturnType = Reflect.getMetadata(
    'design:returntype',
    target,
    methodName
  );
  console.log(`returntypes : ${designReturnType}`);
}

class ClassWithMetaData {
  print(@metadataParameterDec id: number, name: string): number {
    return 1000;
  }
}

console.log('\n########  10. Metadata');
const METADATA_KEY = '__@ngrx/effects__';
const r: any = Reflect;

export interface EffectMetadata {
  propertyName: string;
  dispatch: boolean;
}

function compose(...functions: any[]) {
  return function(arg: any) {
    if (functions.length === 0) {
      return arg;
    }

    const last = functions[functions.length - 1];
    const rest = functions.slice(0, -1);

    /**
     * Calls the specified callback function for all the elements in an array, in descending order.
     * The return value of the callback function is the accumulated result, and is provided as an
     * argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
     * the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation.
     * The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    return rest.reduceRight((composed, fn) => fn(composed), last(arg));
  };
}

export function getSourceForInstance(instance: Object): any {
  return Object.getPrototypeOf(instance);
}

function getEffectMetadataEntries(sourceProto: any): EffectMetadata[] {
  return sourceProto.constructor[METADATA_KEY] || [];
}

function setEffectMetadataEntries(sourceProto: any, entries: EffectMetadata[]) {
  const constructor = sourceProto.constructor;
  const meta: EffectMetadata[] = constructor.hasOwnProperty(METADATA_KEY)
    ? (constructor as any)[METADATA_KEY]
    : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[
        METADATA_KEY
      ];
  Array.prototype.push.apply(meta, entries);
}

const getSourceMetadata = compose(
  getEffectMetadataEntries,
  getSourceForInstance
);

function Effect({ dispatch } = { dispatch: true }): PropertyDecorator {
  return function(target: any, propertyName: string) {
    const metadata: EffectMetadata = { propertyName, dispatch };
    setEffectMetadataEntries(target, [metadata]);
  };
}

console.log(getEffectMetadataEntries);
console.log(getSourceMetadata);

class ClassWithEffectMetaData {
  @Effect() test: string = 'null';

  @Effect()
  print(id: number, name: string): number {
    return 1000;
  }

  @Effect({ dispatch: false })
  print2(id: number, name: string): number {
    return 1000;
  }
}

let classWithEffectMetaData = new ClassWithEffectMetaData();
console.log(ClassWithEffectMetaData);
console.log(getEffectMetadataEntries(classWithEffectMetaData));

type EffectsMetadata<T> = {
  [key in keyof T]?: undefined | { dispatch: boolean }
};

function getEffectsMetadata<T>(instance: T): EffectsMetadata<T> {
  const metadata: EffectsMetadata<T> = {};

  getSourceMetadata(instance).forEach(({ propertyName, dispatch }) => {
    metadata[propertyName] = { dispatch };
  });

  return metadata;
}

function setEffectMetadata<T>(sourceProto: T, entries: EffectsMetadata<T>[]) {
  const constructor = sourceProto.constructor;
  const meta: EffectsMetadata<T>[] = constructor.hasOwnProperty(METADATA_KEY)
    ? (constructor as any)[METADATA_KEY]
    : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[
        METADATA_KEY
      ];
  Array.prototype.push.apply(meta, entries);
}

class ClassWithEffectsMetaData {
  @Effect() a: any;
  @Effect({ dispatch: true })
  b: any;
  @Effect({ dispatch: false })
  c: any;
  test: any;
}

let classWithEffectsMetaData = new ClassWithEffectsMetaData();
// let test = 'test';
let dispatch: boolean = true;
setEffectMetadata<ClassWithEffectsMetaData>(classWithEffectsMetaData, [
  { test: { dispatch: true } },
]);
console.log(
  getEffectsMetadata<ClassWithEffectsMetaData>(classWithEffectsMetaData)
);
for (let obj in classWithEffectsMetaData.constructor) {
  console.log(obj);
}
