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
      title: '数据类型',
      dataIndex: 'type',
    },
    {
      title: '政务负责人',
      dataIndex: 'creator',
    },
    {
      title: '是否共享启用',
      dataIndex: 'status',
      render: (text) => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
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
        id: 'ZW101',
        type: '政务办公',
        creator: '文雨',
        status: 1,
      },
      {
        id: 'ZW102',
        type: '政策法规',
        creator: '张梦',
        status: '启用',
      },
      {
        id: 'ZW103',
        type: '政务办公',
        creator: '李思思',
        status: 1,
      },
      {
        id: 'ZW104',
        type: '政策法规',
        creator: '王刚',
        status: '启用',
      },
    ];
    return (
      <PageHeaderWrapper title="政务数据交流共享操作">
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
                        添加数据共享操作
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
