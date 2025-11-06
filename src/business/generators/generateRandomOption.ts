export function generateRandomOption(value: string): string {
  const options = value.split(/[,\s]+/).filter(Boolean);

  const randomOption = options[Math.floor(Math.random() * options.length)];
  return randomOption;
}
