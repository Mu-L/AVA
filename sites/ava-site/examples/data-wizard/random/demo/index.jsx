import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Input, Select, Divider } from 'antd';
import { random } from '@antv/data-wizard';

const { Option } = Select;
const randomCategories = ['Basic', 'Address', 'Color', 'Datetime', 'Location', 'Text', 'Web'];
const randomTypes = {
  Basic: ['boolean', 'integer', 'float', 'natural'],
  Address: ['country', 'province', 'city', 'district', 'road', 'address', 'postcode'],
  Color: ['rgb', 'rgba', 'hsl', 'hsla', 'colorname', 'hexcolor', 'decimalcolor'],
  Datetime: ['date', 'time', 'datetime', 'timestamp', 'weekday', 'month'],
  Location: ['latitude', 'longtitude', 'coordinates'],
  Text: [
    'character',
    'string',
    'syllable',
    'word',
    'sentence',
    'paragraph',
    'name',
    'lastname',
    'firstname',
    'cname',
    'cfirstname',
    'clastname',
    'ccharacter',
    'cword',
    'csentence',
    'cparagraph',
    'phone',
    'cZodiac',
  ],
  Web: ['url', 'domain', 'ipv4', 'ipv6', 'email', 'tld'],
};
const { TextArea } = Input;

const App = () => {
  const [types, setTypes] = useState(randomTypes[randomCategories[0]]);
  const [secondType, setSecondType] = useState(randomTypes[randomCategories[0]][0]);

  const R = new random.Random();
  const [data, setData] = useState(R.boolean());

  const onCategoryChange = (value) => {
    setTypes(randomTypes[value]);
    setSecondType(randomTypes[value][0]);
  };

  const onSecondTypeChange = (value) => {
    setSecondType(value);
  };

  useEffect(() => {
    setData(R[secondType]());
  }, [secondType]);

  return (
    <div>
      <Select defaultValue={randomCategories[0]} style={{ width: 120 }} onChange={onCategoryChange}>
        {randomCategories.map((c) => (
          <Option key={c}>{c}</Option>
        ))}
      </Select>
      <Select style={{ width: 120 }} value={secondType} onChange={onSecondTypeChange}>
        {types.map((t) => (
          <Option key={t}>{t}</Option>
        ))}
      </Select>
      <Divider />
      <h3>Data</h3>
      <TextArea style={{ resize: 'none' }} value={JSON.stringify(data)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
