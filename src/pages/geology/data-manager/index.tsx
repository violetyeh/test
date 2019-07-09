import { Component, Fragment } from 'react';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Divider, message, Card, Table, Form, Col, Row, Button, Input, Switch } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Save from './Save';
import styles from '../style.less';

interface DataManagerProps { }
interface DataManagerState {
  saveVisible: boolean;
  data: any[];
  currentItem: any;
}

class DataManager extends Component<DataManagerProps, DataManagerState> {
  state: DataManagerState = {
    saveVisible: false,
    data: [],
    currentItem: {},
  };

  columns: ColumnProps<any>[] = [
    {
      title: '数据编号',
      dataIndex: 'id',
    },
    {
      title: '广告播放日期',
      dataIndex: 'time',
    },
    {
      title: '媒体名称',
      dataIndex: 'type',
    },
    {
      title: '媒体内容',
      dataIndex: 'creator',
    },
    {
      title: '是否成功投放',
      dataIndex: 'status',
      render: (text) => <Switch checkedChildren="成功" unCheckedChildren="失败" />,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.edit(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.setting(record)}>删除</a>

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
  render() {
    const { saveVisible, currentItem } = this.state;
    const data = [
      {
        id: 'SJ20101',
        time:'2019-07-01',
        type: '中央一套',
        creator: '化妆品广告',
        status: 1,
      },
      {
        id: 'SJ20102',
        time:'2019-07-01',
        type: '湖南一套',
        creator: '珠宝广告',
        status: 1,
      },
      {
        id: 'SJ20103',
        time:'2019-07-02',
        type: '中央二套',
        creator: '公益广告',
        status: 1,
      },
      {
        id: 'SJ20104',
        time:'2019-07-02',
        type: '湖南一套',
        creator: '化妆品广告',
        status: 1,
      },
      {
        id: 'SJ20105',
        time:'2019-07-03',
        type: '湖南一套',
        creator: '化妆品广告',
        status: 1,
      },
      {
        id: 'SJ20106',
        time:'2019-07-04',
        type: '湖南一套',
        creator: '汽车广告',
        status: 1,
      },
      {
        id: 'SJ20107',
        time:'2019-07-03',
        type: '湖南一套',
        creator: '医药广告',
        status: 1,
      },
      {
        id: 'SJ20108',
        time:'2019-07-03',
        type: '湖南一套',
        creator: '农药广告',
        status: 1,
      },
    ];
    return (
      <PageHeaderWrapper title="广告投放数据编辑">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="数据编号">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="媒体名称">
                    <Input placeholder="请输入" />
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
                        添加广告投放数据
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
      </PageHeaderWrapper>
    );
  }
}

export default DataManager;
