// tslint:disable:no-trailing-whitespace
// tslint:disable:no-inferrable-types
// tslint:disable:import-spacing
// tslint:disable:component-selector
export namespace Objects {
  interface AttributeDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
  }

  export const list = (obj: any) => [ ...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)];
  export const keys = (obj: any) => Object.keys(obj.prototype.constructor);

  /**
   * Object key, value generator.
   * @example
   *
   * for (const [key, value] of TS.Objects.entries(TestDomain)) {
   *  console.log(`${key}: ${value}`);
   * }
   *
   * @param obj
   */
  export function *entries(obj: any) {
    const propKeys = Reflect.ownKeys(obj);
    for (const propKey of propKeys) {
      yield [propKey, obj[propKey]];
    }
  }

  export const setAttr = (obj: any, attr: string, value: AttributeDescriptor | any ): void => Object.hasOwnProperty(obj) ? obj[attr] = value : Object.defineProperty(obj, attr, value);

}
