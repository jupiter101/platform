// tslint:disable:no-trailing-whitespace
// tslint:disable:no-inferrable-types
/*
Generics

 */
console.log('\n########  Generics\n');

export interface Map<T> {
  [x: string]: T;
}

interface Spec<T> {
  description: string;
  default: T;
}

function getDescription<S extends Map<Spec<any>>, K extends keyof S>(
  specs: S,
  k: K
) {
  if (k in specs) {
    return specs[k].description;
    // error TS2536: Type 'string' cannot be used to index type '{ [k in keyof T]: Spec<T[k]>; }'.
  }
  return null;
}

function getDefault<S extends Map<Spec<any>>, K extends keyof S>(
  specs: S,
  k: K
): S[K]['default'] {
  if (k in specs) {
    return specs[k]['default'];
    // error TS2536: Type 'string' cannot be used to index type '{ [k in keyof T]: Spec<T[k]>; }'.
  }
  return null;
}

let firstDefault = getDefault(
  {
    x: { description: 's', default: 1 },
    y: { description: 's', default: 'ss' },
  },
  'x'
); // number
let secondDefault = getDefault(
  {
    x: { description: 's', default: 1 },
    y: { description: 's', default: 'ss' },
  },
  'y'
); // string

console.log(firstDefault);
