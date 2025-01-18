import { IProfileSave } from './profile';

export enum Table {
  Combo,
  ItemCounts,
}

export class Store {
  static dbName = 'aehmmm-counter';
  static combo = 'combo';
  static itemCount = 'itemCount';

  constructor(public profile: string) {}

  private name(): string {
    return Store.dbName + this.profile;
  }

  save(counter: IProfileSave) {
    window.localStorage.setItem(this.name(), JSON.stringify(counter));
  }

  load(): IProfileSave | null {
    const data = window.localStorage.getItem(this.name());
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  public static saveProfileNames(profiles: string) {
    window.localStorage.setItem(
      Store.dbName + '-profiles',
      JSON.stringify(profiles)
    );
  }

  public static loadProfileNames(): string[] {
    const profiles = window.localStorage.getItem(Store.dbName + '-profiles');
    if (profiles) {
      return JSON.parse(profiles);
    }
    return [];
  }
}
