export const a = () => {
    const arr = [1, 2, 3];
    const arr2 = [...arr];
    const [a, ...rest] = arr2;
    console.log(a);
    console.log(rest);
  };