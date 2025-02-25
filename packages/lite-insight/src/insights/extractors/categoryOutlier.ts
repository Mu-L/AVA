import _sortBy from 'lodash/sortBy';
import { IQR } from '../../algorithms';
import { SignificanceBenchmark } from '../../constant';
import { Datum, OutlierInfo } from '../../interface';
import { calculatePValue } from '../util';

type OutlierItem = {
  index: number;
  significance: number;
  value: number;
};

export const findOutliers = (values: number[]): OutlierItem[] => {
  const IQRResult = IQR(values);

  const lowerOutlierIndexes = IQRResult.lower.indexes;
  const upperOutlierIndexes = IQRResult.upper.indexes;
  const candidates = [];
  lowerOutlierIndexes.forEach((item) => {
    const value = values[item];
    candidates.push({
      index: item,
      type: 'lower',
      value,
    });
  });
  upperOutlierIndexes.forEach((item) => {
    const value = values[item];
    candidates.push({
      index: item,
      type: 'upper',
      value,
    });
  });
  const sortedCandidates = _sortBy(candidates, (item) => Math.abs(IQRResult[item.type].threshold - item.value));

  const results: OutlierItem[] = [];
  for (let i = 0; i < sortedCandidates.length; i += 1) {
    const candidate = sortedCandidates[i];
    const pValue = calculatePValue(values, candidate.value);
    const significance = 1 - pValue;

    if (significance < SignificanceBenchmark) {
      break;
    }
    results.push({
      index: candidate.index,
      value: candidate.value,
      significance,
    });
  }
  return results;
};

export const extractor = (data: Datum[], dimension: string, measure: string): OutlierInfo[] => {
  if (!data || data.length === 0) return [];
  const values = data.map((item) => item?.[measure] as number);
  const outliers = findOutliers(values).map((item) => {
    const { index, significance } = item;
    return {
      type: 'category_outlier',
      dimension,
      measure,
      significance,
      index,
      x: data[index][dimension],
      y: data[index][measure] as number,
    };
  });
  return outliers;
};
