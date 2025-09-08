export const randomColor = (): string => {
  // Genera valores oscuros para r, g, b
  const r = Math.floor(Math.random() * 5) + 120; // 0 - 127
  const g = Math.floor(Math.random() * 106) + 120; // 0 - 127
  const b = Math.floor(Math.random() * 106) + 120; // 0 - 127

  // Convierte a hex con padding
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
    
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
