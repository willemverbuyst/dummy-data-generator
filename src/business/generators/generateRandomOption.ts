export function generateRandomOption(field: string): string {
  const optionsString = field.substring(1);
  const options = optionsString.split(",");
  const randomOption = options[Math.floor(Math.random() * options.length)];
  return randomOption;
}
