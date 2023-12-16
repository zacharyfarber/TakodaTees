export function customToFixed(num: number) {
  const decimalPart = num.toString().split('.')[1];

  if (decimalPart && decimalPart.length > 2) {
    return num.toFixed(2);
  }

  return num.toString();
}
