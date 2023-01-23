export type TupleToObject<T extends readonly string[]> = {
  [P in T[number]]: boolean;
};
