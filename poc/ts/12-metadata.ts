// tslint:disable:no-trailing-whitespace
// tslint:disable:no-inferrable-types
import { Type } from '@angular/core';

function getAnnotations(typeOrFunc: Type<any>): any[] | null {
  // Prefer the direct API.
  if ((<any>typeOrFunc).annotations) {
    let annotations = (<any>typeOrFunc).annotations;
    if (typeof annotations === 'function' && annotations.annotations) {
      annotations = annotations.annotations;
    }
    return annotations;
  }

  // API of tsickle for lowering decorators to properties on the class.
  if ((<any>typeOrFunc).decorators) {
    return convertTsickleDecoratorIntoMetadata((<any>typeOrFunc).decorators);
  }

  // API for metadata created by invoking the decorators.
  if (Reflect && Reflect.getOwnMetadata) {
    return Reflect.getOwnMetadata('annotations', typeOrFunc);
  }
  return null;
}

function convertTsickleDecoratorIntoMetadata(
  decoratorInvocations: any[]
): any[] {
  if (!decoratorInvocations) {
    return [];
  }
  return decoratorInvocations.map(decoratorInvocation => {
    const decoratorType = decoratorInvocation.type;
    const annotationCls = decoratorType.annotationCls;
    const annotationArgs = decoratorInvocation.args
      ? decoratorInvocation.args
      : [];
    return new annotationCls(...annotationArgs);
  });
}

// usage:
// const annotations = getAnnotations(AppModule);
