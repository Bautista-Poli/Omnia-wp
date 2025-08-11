export class ClassCell {
  private static readonly EMPTY: ClassCell = new ClassCell(null, null);

  private constructor(
    private readonly _name: string | null,
    private readonly _id: number | null
  ) {
    Object.freeze(this);
  }

  get name(): string | null { return this._name; }
  get id(): number | null { return this._id; }
  get isEmpty(): boolean { return this._name === null || this._id === null; }

  static empty(): ClassCell { return ClassCell.EMPTY; }
  static of(name: string, id: number): ClassCell {
    return new ClassCell(name, id);
  }
}


