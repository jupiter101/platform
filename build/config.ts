export interface PackageDescription {
  name: string;
  hasTestingModule: boolean;
}

export interface Config {
  packages: PackageDescription[];
  scope: string;
}

export const packages: PackageDescription[] = [
  {
    name: 'db',
    hasTestingModule: false,
  },
  {
    name: 'validation',
    hasTestingModule: false,
  }
];
