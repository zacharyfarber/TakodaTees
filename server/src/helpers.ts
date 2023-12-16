export function customToFixed(num: number) {
  const decimalPart = num.toString().split('.')[1];

  if (decimalPart) {
    return num.toFixed(2);
  }

  return num.toString();
}
