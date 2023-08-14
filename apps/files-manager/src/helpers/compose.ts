export const compose =
  (...fns: any[]) =>
  (x: any) =>
    fns.reduceRight((y, f) => f(y), x);
