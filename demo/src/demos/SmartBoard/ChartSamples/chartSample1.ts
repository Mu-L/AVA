import { ChartListInfo } from '../../../../../packages/smart-board/src/interfaces';

const cars = 'https://cdn.jsdelivr.net/npm/vega-datasets@2/data/cars.json';

const chartSample1: ChartListInfo = [
  {
    data: cars,
    subspaces: [],
    breakdowns: ['Origin'],
    measures: ['Horsepower'],
    fieldInfo: {
      Origin: {
        dataType: 'string',
      },
      Horsepower: {
        dataType: 'number',
      },
    },
    insightType: 'outlier',
    score: 0.5,
    chartType: 'column_chart',
  },
  {
    data: cars,
    subspaces: [],
    breakdowns: ['Year'],
    measures: ['Acceleration'],
    insightType: 'trend',
    score: 0.8,
    chartType: 'line_chart',
  },
  {
    data: cars,
    subspaces: [],
    breakdowns: ['Origin'],
    measures: ['Miles_per_Gallon'],
    insightType: 'proportion',
    score: 0.6,
    chartType: 'pie_chart',
  },
  {
    data: cars,
    subspaces: [],
    breakdowns: ['Cylinders', 'Origin'],
    measures: ['Displacement'],
    insightType: 'extreme',
    score: 0.85,
    chartType: 'grouped_column_chart',
  },
  {
    data: cars,
    subspaces: [],
    breakdowns: ['Year', 'Origin'],
    measures: ['Weight_in_lbs'],
    insightType: 'trend',
    score: 0.2,
    chartType: 'line_chart',
  },
  {
    data: cars,
    subspaces: [],
    breakdowns: ['Year'],
    measures: ['Displacement'],
    insightType: 'trend',
    score: 0.7,
    chartType: 'line_chart',
  },
];

export default chartSample1;
