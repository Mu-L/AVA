import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Divider, Input, Button } from 'antd';
import { statistics } from '@antv/data-wizard';

const { TextArea } = Input;

const App = () => {
  const [data, setData] = useState([1, 2, 3, 100, 999, 201]);
  const [textAreaValue, setTextAreaValue] = useState(data);

  const onClick = () => {
    setData(JSON.parse(JSON.stringify(textAreaValue)));
  };

  return (
    <div>
      <h3>Data</h3>
      <Button type="primary" onClick={onClick}>
        Generate Results
      </Button>
      <TextArea
        style={{ resize: 'none' }}
        value={typeof textAreaValue === 'object' ? JSON.stringify(textAreaValue) : textAreaValue}
        onChange={(e) => {
          setTextAreaValue(e.target.value);
        }}
      />
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flexBasis: '200px' }}>
          <h3>Min</h3>
          <div>
            <TextArea style={{ height: '240px', resize: 'none' }} value={statistics.min(data)} />
          </div>
        </div>
        <div style={{ flexBasis: '200px' }}>
          <h3>Mean</h3>
          <TextArea style={{ height: '240px', resize: 'none' }} value={statistics.mean(data)} />
        </div>
        <div style={{ flexBasis: '200px' }}>
          <h3>Variance</h3>
          <TextArea style={{ height: '240px', resize: 'none' }} value={statistics.variance(data)} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
