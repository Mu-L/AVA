import React from 'react';
import ReactDOM from 'react-dom';
import { List } from 'antd';
import ReactJson from 'react-json-view';

// import
import { Advisor } from '@antv/chart-advisor';

// contants

const trickyData = [
  { nom1: 'A', nom2: 'apple', nom3: 'red' },
  { nom1: 'B', nom2: 'banana', nom3: 'yellow' },
  { nom1: 'C', nom2: 'carrot', nom3: 'orange' },
];

// custom chart
const triNominalChart = {
  id: 'trinominal_chart',
  name: 'TriNominal Chart',
  alias: ['three cate chart'],
  family: ['MultiNominalCharts'],
  def: 'This chart takes three nominal fields for encoding.',
  purpose: ['Comparison'],
  coord: ['Cartesian2D'],
  category: ['Statistic'],
  shape: ['Square'],
  dataPres: [{ minQty: 3, maxQty: 3, fieldConditions: ['Nominal'] }],
  channel: ['Position', 'Color'],
  recRate: 'Use with Caution',
};

// custom chart to spec logic
const toTriNominal = (data, dataProps) => {
  const field4X = dataProps[0];
  const field4Y = dataProps[1];
  const field4Color = dataProps[2];

  if (!field4X || !field4Y || !field4Color) return null;

  const spec = {
    basis: {
      type: 'chart',
    },
    data: {
      type: 'json-array',
      values: data,
    },
    layer: [
      {
        mark: 'rect',
        encoding: {
          x: {
            field: field4X.name,
            type: 'nominal',
          },
          color: {
            field: field4Color.name,
            type: 'nominal',
          },
          y: {
            field: field4Y.name,
            type: 'nominal',
          },
        },
      },
    ],
  };

  return spec;
};

triNominalChart.toSpec = toTriNominal;

// custom CKB config
const myCKBCfg = {
  include: ['line_chart', 'pie_chart'], // only include 2 of origin charts
  custom: { trinominal_chart: triNominalChart }, // and a custom chart
};

// usage
const myAdvisor = new Advisor({ ckbCfg: myCKBCfg });

const advices = myAdvisor.advise({ data: trickyData, options: { showLog: true } });

const App = () => (
  <List
    itemLayout="vertical"
    pagination={{ pageSize: 1, position: 'top' }}
    dataSource={advices}
    split={false}
    renderItem={(item, index) => {
      return (
        <List.Item key={index}>
          <ReactJson
            src={item}
            iconStyle
            name={false}
            displayObjectSize={false}
            displayDataTypes={false}
            collapsed={1}
          />
        </List.Item>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('container'));
