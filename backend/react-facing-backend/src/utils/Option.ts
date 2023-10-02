export class Option<T, E> {
  private value: T | undefined;
  private error: E | undefined;

  private constructor(value: T | undefined, error: E | undefined) {
    this.value = value;
    this.error = error;
  }

  static Some<T, E>(value: T): Option<T, E> {
    return new Option(value, undefined as any);
  }

  static None<T, E>(error: E): Option<T, E> {
    return new Option(undefined as any, error);
  }

  isSome(): boolean {
    return this.value !== undefined;
  }

  isNone(): boolean {
    return this.error !== undefined;
  }

  unwrap(): T {
    if (this.isSome()) {
      return this.value as T;
    } else {
      throw new Error("Tried to unwrap a None option.");
    }
  }

  unwrapOr(defaultValue: T): T {
    if (this.isSome()) {
      return this.value as T;
    } else {
      return defaultValue;
    }
  }

  expect(errorMessage: string): T {
    if (this.isSome()) {
      return this.value as T;
    } else {
      throw new Error(errorMessage);
    }
  }

  map<U>(fn: (value: T) => U): Option<U, E> {
    if (this.isSome()) {
      return Option.Some(fn(this.value as T));
    } else {
      return Option.None(this.error as E);
    }
  }

  mapOr<U>(defaultValue: U, fn: (value: T) => U): U {
    if (this.isSome()) {
      return fn(this.value as T);
    } else {
      return defaultValue;
    }
  }
}
