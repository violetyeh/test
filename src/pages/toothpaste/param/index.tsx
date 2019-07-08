import { Component } from 'react';
import React from 'react';
import { message } from 'antd';

class Param extends Component {
  render() {
    return <div>{message.error('请链接设备后进行此操作！')}</div>;
  }
}

export default Param;
