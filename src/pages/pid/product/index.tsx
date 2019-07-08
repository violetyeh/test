import { Component, Fragment } from 'react';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Divider, message, Card, Table, Form, Col, Row, Button, Input } from 'antd';
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
      title: '产品名称',
      dataIndex: 'experis',
    },
    {
      title: '产品类别',
      dataIndex: 'name',
    },
    {
      title: '检测程序',
      dataIndex: 'review',
    },
    {
      title: '是否合格',
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
        name: '化妆品',
        experis: '口红',
        review: 'PROGRAM-1',
        status: '合格',
      },
      {
        id: '2',
        name: '化妆品',
        experis: '腮红',
        review: 'PROGRAM-2',
        status: '启用',
      },
      {
        id: '3',
        name: '化妆品',
        experis: '粉底液',
        review: 'MB-PROGRAM',
        status: '启用',
      },
      {
        id: '4',
        name: '化妆品',
        experis: '眉笔',
        review: 'FDY-PROGRAM',
        status: '启用',
      },
      {
        id: '5',
        name: '化妆品',
        experis: 'BB霜',
        review: 'BBS-PROGRAM',
        status: '启用',
      },
      {
        id: '6',
        name: '护肤品',
        experis: '隔离霜',
        review: 'GLS-PROGRAM',
        status: '启用',
      },
      {
        id: '7',
        name: '化妆品',
        experis: '眼影',
        review: 'YY-PROGRAM',
        status: '启用',
      },
      {
        id: '8',
        name: '护肤品',
        experis: '防晒霜',
        review: 'FSS-PROGRAM',
        status: '启用',
      },
    ];
    return (
      <PageHeaderWrapper title="计量设置">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="单位名称">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="表达式">
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
                        添加程序
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
