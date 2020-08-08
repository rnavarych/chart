'use strict';

const parse = require('color-parse');
const hsl = require('color-space/hsl');
const lerp = require('lerp');
const clamp = require('clamp');
import { Easing } from 'react-native';
import { TimeSection } from '../interfaces/entities';

const bezier = Easing.bezier(0.61, 0.35, 0.41, 0.75);

const ease = (t) => {
  return bezier(t);
};

export function interpolate(palette: any, weights: number[], timeSection: TimeSection) {
  // Parsing colors from the palette given
  palette = palette.map(function (c: any) {
    c = parse(c);
    if (c.space != 'rgb') {
      if (c.space != 'hsl') throw 'c.space' + 'space is not supported.';
      c.values = hsl.rgb(c.values);
    }
    c.values.push(c.alpha);
    return c.values;
  });

  const [weight1, weight2, weight3] = weights;

  // Function used in the application
  return function (
    t: number,
    mix?: (first: number, second: number, fraction: number) => number,
  ) {
    let idx = 0,
      lIdx,
      rIdx;
    mix = mix || lerp;
    t = clamp(t, 0, 1);

    // Calculation of indexes of the nearest right and left colors
    switch (timeSection) {
      case TimeSection.MORNING: {
        idx = (palette.length - 1) * t;
        break;
      }
      case TimeSection.AFTERNOON: {
        if (t < 0.5) {
          idx = t / (0.5 / weight1);
        }
        if (t >= 0.5) {
          idx = (t - 0.5) / (0.5 / weight2) + weight1;
          if (idx >= palette.length - 1) idx = palette.length - 1;
        }
        break;
      }
      case TimeSection.EVENING: {
        if (t < 0.33) {
          idx = t / (0.33 / weight1);
        }
        if (t >= 0.33 && t < 0.66) {
          idx = (t - 0.33) / (0.33 / weight2) + weight1;
        }
        if (t >= 0.66) {
          idx = (t - 0.66) / (0.33 / weight3) + weight2 + weight1;
          if (idx >= palette.length - 1) idx = palette.length - 1;
        }
        break;
      }
    }
    lIdx = Math.floor(idx);
    rIdx = Math.ceil(idx);

    // Calculation of a fraction to use in linear interpolation
    t = idx - lIdx;

    // Pick colors
    var lColor = palette[lIdx],
      rColor = palette[rIdx];

    // Linearly interpolate between r g and b to compose new color
    var result = lColor.map(function (v, i) {
      v = mix(v, rColor[i], ease(t));
      if (i < 3) v = Math.round(v);
      return v;
    });

    if (result[3] === 1) {
      return 'rgb(' + result.slice(0, 3) + ')';
    }
    return 'rgba(' + result + ')';
  };
}
