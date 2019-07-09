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
      title: '设备编号',
      dataIndex: 'id',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '设备日开启时间',
      dataIndex: 'type',
    },
    {
      title: '设备日关闭时间',
      dataIndex: 'date',
    },
    {
      title: '设备负责人',
      dataIndex: 'creator',
    },
    {
      title: '设备分布范围',
      dataIndex: 'status',
      render: (text) => <Progress percent={text} status="active" />,
    },
    {
      title: '设备开启',
      dataIndex: 'switchs',
      render: (text) => <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />,
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
        id: 'GGLY01',
        name: '楼宇广告机001',
        type: '2019-06-23 06:10:10',
        date: '2019-06-23 24:00:00',
        creator: '张丽',
        status: 30,
        switchs:1,
      },
      {
        id: 'GGLY02',
        name: '楼宇广告机002',
        type: '2019-06-24 06:10:10',
        date: '2019-06-24 24:00:00',
        creator: '吴启飒',
        status: 60,
        switchs:1,
      },
      {
        id: 'GGLY03',
        name: '楼宇广告机003',
        type: '2019-06-25 06:10:10',
        date: '2019-06-25 24:00:00',
        creator: '王思',
        status: 30,
        switchs:1,
      },
      {
        id: 'GGLY04',
        name: '楼宇广告机004',
        type: '2019-06-26 06:10:10',
        date: '2019-06-26 24:00:00',
        creator: '陈燕',
        status: 17,
        switchs:1,
      },
      {
        id: 'GGLY05',
        name: '楼宇广告机005',
        type: '2019-06-27 06:10:10',
        date: '2019-06-27 24:00:00',
        creator: '明玉雨',
        status: 26,
        switchs:1,
      },
      {
        id: 'GGLY06',
        name: '楼宇广告机006',
        type: '2019-06-28 06:10:10',
        date: '2019-06-28 24:00:00',
        creator: '刘玉燕',
        status: 56,
        switchs:1,
      },
      {
        id: 'GGLY07',
        name: '楼宇广告机007',
        type: '2019-06-29 06:10:10',
        date: '2019-06-29 24:00:00',
        creator: '李玉',
        status: 16,
        switchs:1,
      },
      {
        id: 'GGLY08',
        name: '楼宇广告机008',
        type: '2019-06-30 06:10:10',
        date: '2019-06-30 24:00:00',
        creator: '汪峰',
        status: 32,
        switchs:1,
      },
    ];
       return (
      <PageHeaderWrapper title="设备管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="设备编号">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="设备名称">
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
                        添加设备
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
