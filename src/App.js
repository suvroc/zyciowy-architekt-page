import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Card,
  Item
} from 'semantic-ui-react'
import HomepageLayout from './HomepageLayout';
import { genericTypeAnnotation } from '@babel/types';

const items = [
  {
    header: 'Project Report - April',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    meta: 'ROI: 30%',
  },
  {
    header: 'Project Report - May',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  },
]

function App() {
  
  return (
    <div className="App" style={{backgroundColor: 'grey'}}>
      <HomepageLayout></HomepageLayout>
    </div>
  );
}

export default App;
