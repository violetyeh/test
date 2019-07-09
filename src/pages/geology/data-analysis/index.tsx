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
      title: '媒体分类',
      dataIndex: 'id',
    },
    {
      title: '广告需求（浏览人数：万）',
      dataIndex: 'date',
    },
    {
      title: '广告定位',
      dataIndex: 'creator',
    },
    {
      title: '精准人群定位',
      dataIndex: 'column',
    },
    {
      title: '价格区间',
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
        id: '广告营销',
        date: 10,
        creator: '标准广告位',
        column:'男',
        status: '10万以内',
      },
      {
        id: '海外营销',
        date: 5,
        creator: '非标运营位',
        column:'女',
        status:'10万-100万',
      },
      {
        id: '自媒体营销',
        date: 30,
        creator: '固定运营位',
        column:'女',
        status: '100万-500万',
      },
      {
        id: '微信营销',
        date: 35,
        creator: '标准广告位',
        column:'女',
        status: '10万-100万',
      },
      {
        id: '微博营销',
        date: 300,
        creator: '非标运营位',
        column:'男',
        status: '10万-100万',
      },
      {
        id: '视频营销',
        date: 70,
        creator: '标准广告位',
        column:'女',
        status: '500万-1000万',
      },
      {
        id: '广告招商',
        date: 3,
        creator: '标准广告位',
        column:'女',
        status: '10万-100万',
      },
      {
        id: '软文营销',
        date: 4,
        creator: '固定运营位',
        column:'女',
        status: '10万-100万',
      },
    ];
       return (
      <PageHeaderWrapper title="广告投放服务管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="媒体分类">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="广告需求">
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
                        添加投放广告服务
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
