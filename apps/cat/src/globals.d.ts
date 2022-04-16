interface Window {rat: RatGlobals;}

interface RatGlobals {
  build: BuildInformation;
}

interface BuildInformation {
  date: string;
  version: string;
  revision: string;
  branch: string;
}

