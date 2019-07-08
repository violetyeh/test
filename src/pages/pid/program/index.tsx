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
      title: '加工程序名称',
      dataIndex: 'experis',
    },
    {
      title: '程序简介',
      dataIndex: 'name',
    },
    {
      title: '执行结果',
      dataIndex: 'review',
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
          <a onClick={() => this.setting(record)}>运行</a>
          <Divider type="vertical" />
          <a onClick={() => this.setting(record)}>检测</a>
          <Divider type="vertical" />
          <a onClick={() => this.setting(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  edit = (record: any) => {
    message.error('设备已离线，无法进行操作');
  };

  setting = (record: any) => {
    message.error('设备已离线，无法进行操作');
  };
  render() {
    const { saveVisible } = this.state;
    const data = [
      {
        id: '1',
        name: '检测粉底液是否达标',
        experis: 'Calculation-1',
        review: '不达标',
        status: '启用',
      },
      {
        id: '2',
        name: '检测气垫霜成分',
        experis: 'Calculation-2',
        review: '不达标',
        status: '启用',
      },
      {
        id: '3',
        name: '检测眼影毒害物质',
        experis: 'Calculation-3',
        review: '达标',
        status: '启用',
      },
      {
        id: '4',
        name: '检测腮红成分',
        experis: 'Calculation-4',
        review: '达标',
        status: '启用',
      },
      {
        id: '5',
        name: '检测超细粉元素',
        experis: 'Calculation-5',
        review: '达标',
        status: '启用',
      },
      {
        id: '6',
        name: '检测化妆品重金属含量',
        experis: 'Calculation-6',
        review: '达标',
        status: '启用',
      },
      {
        id: '7',
        name: '检测毒害物质含量',
        experis: 'Calculation-7',
        review: '达标',
        status: '启用',
      },
      {
        id: '8',
        name: '检测口红重金属含量',
        experis: 'Calculation-8',
        review: '不达标',
        status: '启用',
      },
    ];
    return (
      <PageHeaderWrapper title="加工程序管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="程序名称">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="程序编号">
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
