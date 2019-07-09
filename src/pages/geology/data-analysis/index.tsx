import { Component, Fragment } from 'react';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Divider, message, Card, Table, Form, Col, Row, Button, Input, Switch, Progress } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Save from './Save';
import styles from '../style.less';

interface DataAnalysisProps { }
interface DataAnalysisState {
  saveVisible: boolean;
  data: any[];
  currentItem: any;
}

class DataAnalysis extends Component<DataAnalysisProps, DataAnalysisState> {
  state: DataAnalysisState = {
    saveVisible: false,
    data: [],
    currentItem: {},
  };

  columns: ColumnProps<any>[] = [
    {
      title: '广告类型',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '版本',
      dataIndex: 'type',
    },
    {
      title: '上级分类',
      dataIndex: 'date',
    },
    {
      title: '下级分类',
      dataIndex: 'creator',
    },
    {
      title: '栏目类型',
      dataIndex: 'column',
    },
    {
      title: '定义长度（秒）',
      dataIndex: 'status',
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
        id: '商业广告',
        name: 'OLAY净白系列',
        type: 'P',
        date: '化妆品',
        creator: 'OLAY',
        column:'30秒广告',
        status: 30,
      },
      {
        id: '商业广告',
        name: 'SK-II系列',
        type: 'P',
        date: '化妆品',
        creator: 'SK-II',
        column:'9秒广告',
        status: 9,
      },
      {
        id: '商业广告',
        name: '佰草集系列',
        type: 'P',
        date: '化妆品',
        creator: '佰草集',
        column:'16秒广告',
        status: 16,
      },
      {
        id: '商业广告',
        name: '百雀羚系列',
        type: 'P',
        date: '化妆品',
        creator: '百雀羚',
        column:'10秒广告',
        status: 10,
      },
      {
        id: '公益广告',
        name: '公安部',
        type: 'v0890',
        date: '公益',
        creator: '警民同心 平安春节',
        column:'30秒广告',
        status: 30,
      },
      {
        id: '公益广告',
        name: 'CCTV',
        type: 'v0891',
        date: '公益',
        creator: '战斗英雄张富清',
        column:'17秒广告',
        status: 17,
      },
      {
        id: '珠宝广告',
        name: '周六福',
        type: 'P',
        date: '珠宝',
        creator: '黄金',
        column:'20秒广告',
        status: 20,
      },
      {
        id: '珠宝广告',
        name: '周六福',
        type: 'P',
        date: '珠宝',
        creator: '钻石',
        column:'15秒广告',
        status: 15,
      },
    ];
       return (
      <PageHeaderWrapper title="广告投放管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="广告类型">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="名称">
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
                        添加投放广告
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

export default DataAnalysis;
