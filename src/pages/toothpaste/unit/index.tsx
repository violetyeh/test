import { Component, Fragment } from 'react';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Divider, message, Form, Col, Row, Input, Button } from 'antd';
import styles from './style.less';
import { ColumnProps } from 'antd/lib/table';
import Save from './Save';

interface UnitProps {}

interface UnitState {
  saveVisible: boolean;
}

class Unit extends Component<UnitProps, UnitState> {
  state: UnitState = {
    saveVisible: false,
  };

  columns: ColumnProps<any>[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '单位名称',
      dataIndex: 'name',
    },
    {
      title: '表达式',
      dataIndex: 'experis',
    },
    {
      title: '是否启用',
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
        name: '毫克',
        experis: 'mg',
        status: '启用',
      },
      {
        id: '2',
        name: '千克',
        experis: 'kg',
        status: '启用',
      },
      {
        id: '3',
        name: '克',
        experis: 'g',
        status: '启用',
      },
      {
        id: '4',
        name: '温度',
        experis: 'C',
        status: '启用',
      },
      {
        id: '5',
        name: '支',
        experis: 'G',
        status: '启用',
      },
      {
        id: '6',
        name: '升',
        experis: 'l',
        status: '启用',
      },
      {
        id: '7',
        name: '毫升',
        experis: 'ml',
        status: '启用',
      },
    ];
    return (
      <PageHeaderWrapper title="单位设置">
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
                        添加单位
                      </Button>
                      <Divider type="vertical" />
                      <Button icon="search" type="primary" htmlType="submit">
                        查询
                      </Button>
                      <Button style={{ marginLeft: 8 }} onClick={() => {}}>
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

export default Unit;
