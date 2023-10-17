export enum Table {
  Combo,
  ItemCounts,
}

export class Store {
  static dbName = 'aehmmm-counter';

  constructor(private db: IDBDatabase) {}

  public static async open(): Promise<Store> {
    return new Promise((resolve, reject) => {
      const DBOpenRequest = window.indexedDB.open(Store.dbName, 4);
      DBOpenRequest.onerror = (event) => reject('Error opening db: ' + event);
      DBOpenRequest.onsuccess = () => resolve(new Store(DBOpenRequest.result));
    });
  }

  private objStore(table: Table) {
    return this.db.transaction(Store.dbName).objectStore(table.toString());
  }
}
