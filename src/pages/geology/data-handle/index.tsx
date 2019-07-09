import { Component, Fragment } from 'react';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Divider, message, Card, Table, Form, Col, Row, Button, Input, Switch, Select, Tag, Modal } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Save from './Save';
import styles from '../style.less';
import Detail from './Detail';

interface DataHandleProps { }
interface DataHandleState {
  saveVisible: boolean;
  detailVisible: boolean;
  currentItem: any;
}

class DataHandle extends Component<DataHandleProps, DataHandleState> {
  state: DataHandleState = {
    saveVisible: false,
    detailVisible: false,
    currentItem: {},
  };

  columns: ColumnProps<any>[] = [
    {
      title: '媒体设备编号',
      dataIndex: 'id',
    },
    {
      title: '所属区域',
      dataIndex: 'project',
    },
    {
      title: '区域位置',
      dataIndex: 'creator',
    },
    {
      title: '发布类型',
      dataIndex: 'type',
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      render: (text) => (<Tag color="red">{text}</Tag>),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.edit(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.setting(record)}>删除</a>
          {/* <Divider type="vertical" />
          <a onClick={() => this.detail(record)}>详情</a> */}
        </Fragment>
      ),
    },
  ];

  edit = (record: any) => {
    this.setState({
      currentItem: record,
      saveVisible: true,
    })
  };

  setting = (record: any) => {
    message.error('系统处于离线状态，无法进行此操作');
  };

  detail = (record) => {
    console.log('数据处理');
    this.setState({
      detailVisible: true,
    })
  }
  render() {
    const { saveVisible, detailVisible, currentItem } = this.state;
    const data = [
      {
        id: 'MT156',
        project: '中央广场',
        creator: '广袤楼',
        type: '可乐广告',
        status: '播放中',
      },
      {
        id: 'MT157',
        project: '中央公园',
        creator: '广袤楼',
        type: '服装广告',
        status: '等待中',
      }, {
        id: 'MT158',
        project: '三峡广场',
        creator: '齐天楼',
        type: '可乐广告',
        status: '播放中',
      },
       {
        id: 'MT159',
        project: '美食广场',
        creator: '美食街',
        type: '美食广告',
        status: '播放中',
      }, 
      {
        id: 'MT160',
        project: '中央广场',
        creator: '广袤楼',
        type: '珠宝广告',
        status: '播放中',
      },
       {
        id: 'MT162',
        project: '宏宇大道',
        creator: '魔天楼',
        type: '电影宣传',
        status: '等待中',
      },
       {
        id: 'MT165',
        project: '中央大街',
        creator: '影视楼',
        type: '影视宣传',
        status: '播放中',
      }, 
      {
        id: 'MT166',
        project: '流星街',
        creator: '政务楼',
        type: '公告宣传',
        status: '播放中',
      },
    ];
    return (
      <PageHeaderWrapper title="楼宇媒体设备管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="媒体设备编号">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="当前状态">
                    <Select >
                      <Select.Option value="jack">播放中</Select.Option>
                      <Select.Option value="lucy">等待中</Select.Option>
                      
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={9} sm={24}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ float: 'right', marginBottom: 24 }}>
                      <Button
                        icon="plus"
                        htmlType="button"
                        onClick={() => this.setState({ saveVisible: true, currentItem: {} })}
                      >
                        添加媒体设备
                      </Button>
                      <Divider type="vertical" />
                      <Button icon="search" type="primary" htmlType="submit">
                        查询
                      </Button>
                      <Button style={{ marginLeft: 8 }} onClick={() => { }}>
                        重置
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
          <Table dataSource={data} columns={this.columns} rowKey={item => item.id} />
        </Card>
        {saveVisible && <Save currentItem={currentItem} handleSaveVisible={() => this.setState({ saveVisible: false })} />}
        {
          detailVisible && <Detail handleDetailVisible={() => this.setState({ detailVisible: false })} />
        }
      </PageHeaderWrapper>
    );
  }
}

export default DataHandle;
