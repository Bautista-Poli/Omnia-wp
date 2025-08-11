// hour.class.ts (o donde tengas ClassCell)
export class ClassCell {
  private static readonly EMPTY = new ClassCell(null, null, null, null);

  private constructor(
    private readonly _id: number | null,
    private readonly _name: string | null,
    private readonly _time: string | null,   // "HH:mm:ss" exacta
    private readonly _day: number | null,    // 1..5
  ) { Object.freeze(this); }

  get id()   { return this._id; }
  get name() { return this._name; }
  get time() { return this._time; }
  get day()  { return this._day; }
  get isEmpty() { return !this._id || !this._name; }

  static empty() { return ClassCell.EMPTY; }
  static of(name: string, id: number, time: string, day: number) {
    return new ClassCell(id, name, time, day);
  }
}



