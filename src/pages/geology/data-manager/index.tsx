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
      title: '合同编号',
      dataIndex: 'id',
    },
    {
      title: '合同生效日期',
      dataIndex: 'time',
    },
    {
      title: '投放平台',
      dataIndex: 'type',
    },
    {
      title: '合同年限（年）',
      dataIndex: 'creator',
    },
    {
      title: '合同是否生效',
      dataIndex: 'status',
      render: (text) => <Switch checkedChildren="是" unCheckedChildren="否" />,
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
        id: 'HT1320108',
        time:'2019-07-03',
        type: '浙江一套',
        creator: '5',
        status: 1,
      },
      {
        id: 'HT1320101',
        time:'2019-06-23',
        type: '安徽一套',
        creator: '3',
        status: 1,
      },
      {
        id: 'HT1320103',
        time:'2019-06-28',
        type: '中央二套',
        creator: '2',
        status: 1,
      },
      {
        id: 'HT1320104',
        time:'2019-07-02',
        type: '江苏一套',
        creator: '3',
        status: 1,
      },
      {
        id: 'HT1320105',
        time:'2019-07-03',
        type: '湖南一套',
        creator: '5',
        status: 1,
      },
      {
        id: 'HT1320106',
        time:'2019-07-04',
        type: '湖南一套',
        creator: '2',
        status: 1,
      },
      {
        id: 'HT1320102',
        time:'2019-06-05',
        type: '湖南一套',
        creator: '2',
        status: 1,
      },
      {
        id: 'HT1320107',
        time:'2019-07-03',
        type: '湖南一套',
        creator: '1',
        status: 1,
      },
     
    ];
    return (
      <PageHeaderWrapper title="合同数据编辑">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="合同编号">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="投放平台">
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
                        添加合同数据
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
