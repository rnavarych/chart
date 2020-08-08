import * as d3 from 'd3-shape';

import { ANGLE_120, ANGLE_240, ANGLE_360, bubbleR, OUTER_RADIUS } from './constants';
import { TimeSection } from '../../../interfaces/entities';

export const generatePath = (innerR: number, outerR: number, startAngle, endAngle) => {
  return d3
    .arc()
    .innerRadius(innerR)
    .outerRadius(outerR)
    .startAngle(startAngle)
    .endAngle(endAngle);
};

export const calcCoordForBubbles = (
  radius: number,
  angle: number,
  cx: number,
  cy: number,
  bubbleR: number,
) => {
  const radianAngle = ((90 - angle) * Math.PI) / 180;
  return {
    x: Math.cos(radianAngle) * radius,
    y: cy - Math.sin(radianAngle) * radius - bubbleR,
  };
};

export const getAngleForATimeZone = (timezone: TimeSection, radian: boolean) => {
  switch (timezone) {
    case TimeSection.MORNING: {
      if (radian) return ANGLE_120;
      return 120;
    }
    case TimeSection.AFTERNOON: {
      if (radian) return ANGLE_240;
      return 240;
    }
    case TimeSection.EVENING: {
      if (radian) return ANGLE_360;
      return 360;
    }
    default:
      // TODO: what to return here better?
      return 0; // null
  }
};

export const calcBubbleCoordsForASection = (
  array: any[],
  timezone: TimeSection,
  CX,
  CY,
) => {
  if (array.length === 0) return [];
  const angle = 120 / (array.length + 1);
  return array.map((item, index) => {
    return {
      id: item.id,
      ...calcCoordForBubbles(
        OUTER_RADIUS,
        getAngleForATimeZone(timezone, false) - 120 + (index + 1) * angle,
        CX,
        CY,
        bubbleR,
      ),
    };
  });
};
