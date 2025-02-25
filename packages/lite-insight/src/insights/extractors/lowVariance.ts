import { statistics } from '@antv/data-wizard';
import { Datum, LowVarianceInfo } from '../../interface';

type LowVarianceItem = {
  significance: number;
};

type LowVarianceParams = {
  cvThreshold?: number;
};

// Coefficient of variation threshold
const CV_THRESHOLD = 0.15;

export const findLowVariance = (values: number[], params?: LowVarianceParams): LowVarianceItem => {
  const cv = statistics.coefficientOfVariance(values);

  const cvThreshold = params?.cvThreshold || CV_THRESHOLD;
  if (cv >= cvThreshold) {
    return null;
  }
  // The smaller the CV is, the greater the significance is.
  const significance = 1 - cv;
  return {
    significance,
  };
};

export const extractor = (data: Datum[], dimension: string, measure: string): LowVarianceInfo[] => {
  if (!data || data.length === 0) return [];

  const values = data.map((item) => item?.[measure] as number);
  const lowVariance = findLowVariance(values);

  if (lowVariance) {
    const { significance } = lowVariance;
    return [
      {
        type: 'low_variance',
        dimension,
        significance,
      },
    ];
  }
  return [];
};
