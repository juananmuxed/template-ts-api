const isEmpty = <T extends Record<string, unknown>>(obj: T) => Object.keys(obj).length === 0;

export const object = {
  isEmpty,
};
