import _groupBy from 'lodash/groupBy';
import _flatten from 'lodash/flatten';
import { PATTERN_TYPES } from '../constant';
import { Measure, InsightInfo, InsightType, PatternInfo, PointPatternInfo, HomogeneousPatternInfo } from '../interface';

/**
 * homogeneous data pattern (HDP) represents a set of basic data patterns that share certain relations. HDP are identified by categorizing basic data patterns (within an HDP) into commonness(es) and exceptions considering inter-pattern similarity,
 */

export type PatternCollection = Record<InsightType, PatternInfo[]>;
type ScopePatternCollection = { key: string; patterns: PatternInfo[] }[];

const extractHomogeneousPatterns = (
  collection: ScopePatternCollection,
  type: InsightType
): HomogeneousPatternInfo[] => {
  const homogeneousPatterns: HomogeneousPatternInfo[] = [];
  const scopeLength = collection.length;
  const validScopes = collection.filter((item) => item.patterns?.length > 0);
  if (validScopes.length > 1) {
    if (type === 'trend') {
      const parts = Object.values(_groupBy(collection, 'patterns.0.trend')).sort((a, b) => b.length - a.length);
      if (
        parts.length === 2 &&
        parts[0][0]?.patterns?.length &&
        parts[0].length / scopeLength > 0.75 &&
        parts[1].length < 5
      ) {
        homogeneousPatterns.push({
          type: 'exception',
          insightType: type,
          childPatterns: _flatten(validScopes.map((item) => item.patterns)),
          commSet: parts[0].map((item) => item.key),
          exc: parts[1].map((item) => item.key),
          significance: 1 - parts[1].length / scopeLength,
        });
      } else {
        parts.forEach((part) => {
          const ratio = part.length / scopeLength;
          if (ratio > 0.3 && part.length >= 3 && part[0]?.patterns) {
            const childPatterns = _flatten(part.map((item) => item.patterns));
            if (childPatterns.length) {
              homogeneousPatterns.push({
                type: 'commonness',
                insightType: type,
                childPatterns,
                commSet: part.map((item) => item.key),
                significance: ratio,
              });
            }
          }
        });
      }
    }
    if (['change_point', 'outlier', 'time_series_outlier'].includes(type)) {
      const commSetIndexes = Object.values(
        _groupBy(_flatten(validScopes.map((item) => item.patterns.map((item: PointPatternInfo) => item.index))))
      ).sort((a, b) => b.length - a.length);
      commSetIndexes.forEach((indexArr) => {
        const ratio = indexArr.length / scopeLength;
        if (ratio > 0.3 && indexArr.length >= 3) {
          const scopes = validScopes.filter((item) =>
            item.patterns.some((item: PointPatternInfo) => item.index === indexArr[0])
          );
          const childPatterns = _flatten(
            scopes.map((item) => item.patterns.filter((item: PointPatternInfo) => item.index === indexArr[0]))
          );
          homogeneousPatterns.push({
            type: 'commonness',
            insightType: type,
            childPatterns,
            commSet: scopes.map((item) => item.key),
            significance: ratio,
          });
        }
      });
    }
  }
  return homogeneousPatterns;
};

export const extractHomogeneousPatternsForMeausres = (
  measures: Measure[],
  patternsArr: PatternCollection[]
): HomogeneousPatternInfo[] => {
  const series = measures.map((item) => item.field);
  const homogeneousPatterns: HomogeneousPatternInfo[] = [];
  PATTERN_TYPES.forEach((type) => {
    const patternCollection = patternsArr.map((item, index) => ({ key: series[index], patterns: item[type] }));

    const patterns = extractHomogeneousPatterns(patternCollection, type);

    homogeneousPatterns.push(...patterns);
  });
  return homogeneousPatterns;
};

export const extractHomogeneousPatternsForSiblingGroups = (
  measures: Measure[],
  siblingItems: string[],
  insightsCollection: InsightInfo<PatternInfo>[][]
): HomogeneousPatternInfo[][] => {
  const measuresLength = measures.length;
  const groupLength = insightsCollection.length;
  if (siblingItems.length !== groupLength) return [];
  const homogeneousPatterns = [];
  for (let i = 0; i < measuresLength; i += 1) {
    const patternsForMeasure = [];
    const patternsArr = insightsCollection.map((group) => group[i]?.patterns);
    PATTERN_TYPES.forEach((type) => {
      const patternCollection = patternsArr.map((arr, index) => ({
        key: siblingItems[index],
        patterns: arr?.filter((item) => item.type === type),
      }));
      const patterns = extractHomogeneousPatterns(patternCollection, type);
      patternsForMeasure.push(...patterns);
    });
    homogeneousPatterns.push(patternsForMeasure);
  }
  return homogeneousPatterns;
};
