import { schemeCategory10 } from 'd3-scale-chromatic';
import { scaleOrdinal } from 'd3-scale';
// eslint-disable-next-line import/no-extraneous-dependencies
import { rgb } from 'd3-color';

const lightenWithWhite = (hex: string, factor = 0.3): string => {
  const c = rgb(hex);
  c.r = Math.round(c.r + (255 - c.r) * factor);
  c.g = Math.round(c.g + (255 - c.g) * factor);
  c.b = Math.round(c.b + (255 - c.b) * factor);
  return c.formatHex();
};

const cartoonCategory10 = schemeCategory10.map((c) => lightenWithWhite(c, 0.4));

const colorScale = scaleOrdinal(cartoonCategory10);

export const pickCartoonCategoryColor = (index: number): string => {
  return colorScale(index.toString());
};
