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
      title: '文件编号',
      dataIndex: 'id',
    },
    {
      title: '地区名称',
      dataIndex: 'name',
    },
    {
      title: '政务类型',
      dataIndex: 'type',
    },
    {
      title: '数据共享交流时间',
      dataIndex: 'date',
    },
    {
      title: '政务负责人',
      dataIndex: 'creator',
    },
    {
      title: '交流进度',
      dataIndex: 'status',
      render: (text) => <Progress percent={text} status="active" />,
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
        id: '1001',
        name: '南沙区',
        type: '政务办公',
        date: '2019-07-01 17:13:25',
        creator: '张丽',
        status: 50,
      },
      {
        id: '1002',
        name: '越秀区',
        type: '政策法规',
        date: '2019-07-02 18:15:13',
        creator: '林立',
        status: 80,
      },
      {
        id: '1003',
        name: '天河区',
        type: '政务公文',
        date: '2019-07-01 19:23:20',
        creator: '邓忠',
        status: 66,
      },
      {
        id: '1004',
        name: '海珠区',
        type: '财政管理',
        date: '2019-07-01 20:49:02',
        creator: '蒋楠',
        status: 88,
      },
      {
        id: '1005',
        name: '增城区',
        type: '政务公文',
        date: '2019-07-02 14:36:32',
        creator: '刘坤',
        status: 78,
      },
      {
        id: '1006',
        name: '白云区',
        type: '政策法规',
        date: '2019-07-02 16:22:13',
        creator: '张文',
        status: 58,
      },
      {
        id: '1007',
        name: '花都区',
        type: '政务办公',
        date: '2019-07-03 09:56:34',
        creator: '王宗',
        status: 68,
      },
      {
        id: '1008',
        name: '从化区',
        type: '财政管理',
        date: '2019-07-03 12:33:52',
        creator: '林懂',
        status: 67,
      },
    ];
    return (
      <PageHeaderWrapper title="政务文件管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="地区名称">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="政务负责人">
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
                        添加政务项目
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
