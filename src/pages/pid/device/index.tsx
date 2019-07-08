import { Component, Fragment } from 'react';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Divider, message, Card, Table, Form, Col, Row, Button, Input, Switch } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Save from './Save';
import styles from '../style.less';

interface MeteringProps { }
interface MeteringState { }

class Metering extends Component<MeteringProps, MeteringState> {
  state: MeteringState = {
    saveVisible: false,
  };

  columns: ColumnProps<any>[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '设备编号',
      dataIndex: 'experis',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '加工物类别',
      dataIndex: 'review',
    },
    {
      title: '设备类型',
      dataIndex: 'type',
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      render: (text) => {
        if (text !== 1) {
          return <Switch checkedChildren="启用" unCheckedChildren="禁用" checked />
        } else {
          return <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        }
      },
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
    message.error('设备已离线，无法进行编辑操作');
  };

  setting = (record: any) => {
    message.error('设备已离线，无法进行编辑操作');
  };
  render() {
    const { saveVisible } = this.state;
    const data = [
      {
        id: '1',
        name: '粉底液加工设备',
        experis: 'MACHINING-1',
        review: '粉底液',
        type: '全自动',
        status: 1,
      },
      {
        id: '2',
        name: '气垫霜加工设备',
        experis: 'MACHINING-2',
        review: '气垫霜',
        type: '智能设备',
        status: 1,
      },
      {
        id: '3',
        name: '眼影成分加工设备',
        experis: 'MACHINING-3',
        review: '眼影',
        type: '手动控制',
        status: '启用',
      },
      {
        id: '4',
        name: '腮红元素加工设备',
        experis: 'MACHINING-4',
        review: '腮红',
        type: '半智能设备',
        status: '启用',
      },
      {
        id: '5',
        name: '口红重金属加工设备',
        experis: 'MACHINING-5',
        review: '口红',
        type: '全自动',
        status: 1,
      },
      {
        id: '6',
        name: '超细粉加工设备',
        experis: 'MACHINING-6',
        review: '超细分',
        type: '全自动',
        status: '启用',
      },
      {
        id: '7',
        name: '化妆品化学物质综合加工设备',
        experis: 'MACHINING-7',
        type: '全自动',
        review: '化学物质',
        status: 1,
      },
      {
        id: '8',
        name: '毒害物质智能加工设备',
        experis: 'MACHINING-8',
        review: '毒害物质',
        type: '全自动',
        status: 1,
      },
    ];
    return (
      <PageHeaderWrapper title="加工设备管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="设备名称">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="设备编号">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={9} sm={24}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ float: 'right', marginBottom: 24 }}>
                      <Button
                        icon="plus"
                        htmlType="button"
                        onClick={() => this.setState({ saveVisible: true })}
                      >
                        添加加工设备
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
        {saveVisible && <Save handleSaveVisible={() => this.setState({ saveVisible: false })} />}
      </PageHeaderWrapper>
    );
  }
}

export default Metering;
