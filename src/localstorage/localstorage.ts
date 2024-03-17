enum Mode {
  InMemory,
  Browser,
}

class LocalStorage {
  // In memory db used as a fallback in the scenario
  // where localstorage is not defined
  private db: Record<string, unknown> = {};
  private mode: Mode;

  constructor() {
    this.mode = window.localStorage ? Mode.Browser : Mode.InMemory;
  }

  setItem(key: string, value: unknown) {
    if (this.mode === Mode.InMemory) {
      this.db[key] = value;
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T = unknown>(key: string) {
    if (this.mode === Mode.InMemory) {
      return this.db[key] as T | null;
    }
    const data = window.localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  removeItem(key: string) {
    if (this.mode === Mode.InMemory) {
      delete this.db[key];
      return;
    }
    window.localStorage.removeItem(key);
  }
}

export default new LocalStorage();
