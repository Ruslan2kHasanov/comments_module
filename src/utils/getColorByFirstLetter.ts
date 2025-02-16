export function getColorByFirstLetter(str: string): string {
  const firstLetter = str.charAt(0).toLowerCase();
  const colorMap = [
    { regex: /^[0-9]/, color: '#919191' },
    { regex: /^[а-гa-e]/i, color: '#ff6446' },
    { regex: /^[д-зf-j]/i, color: '#49aeff' },
    { regex: /^[и-пk-o]/i, color: '#4bc440' },
    { regex: /^[р-яp-z]/i, color: '#c263ff' },
  ];

  // eslint-disable-next-line no-restricted-syntax
  for (const { regex, color } of colorMap) {
    if (regex.test(firstLetter)) {
      return color;
    }
  }

  return '#000000';
}
