import { Component, Fragment } from 'react';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Divider, message, Card, Table, Form, Col, Row, Button, Input, Switch } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Save from './Save';
import styles from '../style.less';

interface ProjectProps { }
interface ProjectState { }

class Project extends Component<ProjectProps, ProjectState> {
  state: ProjectState = {
    saveVisible: false,
  };

  columns: ColumnProps<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '工程编号',
      dataIndex: 'number',
    },
    {
      title: '工程名称',
      dataIndex: 'name',
    },
    {
      title: '负责人',
      dataIndex: 'creator',
    },
    {
      title: '岩土类型',
      dataIndex: 'type',
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      render: (text) =>
        <Switch checkedChildren="正常" unCheckedChildren="暂停" defaultChecked />,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.edit(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.setting(record)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => this.setting(record)}>详情</a>
        </Fragment>
      ),
    },
  ];

  edit = (record: any) => {
    message.error('系统处于离线状态，无法进行此操作');
  };

  setting = (record: any) => {
    message.error('系统处于离线状态，无法进行此操作');
  };
  render() {
    const { saveVisible } = this.state;
    const data = [
      {
        id: '1',
        number: 'GEOLOGY191',
        name: '华北岩土勘查一期工程',
        creator: '张思琳',
        type: '软岩',
        status: 2,
      },
      {
        id: '2',
        number: 'GEOLOGY131',
        name: '公路岩土勘察工程',
        creator: '张思琳',
        type: '较软岩',
        status: 1,
      },
      {
        id: '3',
        number: 'GEOLOGY811',
        name: '华中岩土勘察六期工程',
        creator: '张思琳',
        type: '较硬岩',
        status: 2,
      },
      {
        id: '4',
        number: 'GEOLOGY411',
        name: '西南岩土勘察中期工程',
        creator: '林辉',
        type: '岩土',
        status: 2,
      },
      {
        id: '5',
        number: 'GEOLOGY800',
        name: '华中岩土勘察六期工程',
        creator: '林辉',
        type: '较硬岩',
        status: 1,
      },
      {
        id: '6',
        number: 'GEOLOGY661',
        name: '西南岩土勘察中期工程',
        creator: '曾莉',
        type: '较硬岩',
        status: 2,
      },
      {
        id: '7',
        number: 'GEOLOGY171',
        name: '华东岩土勘察二期项目',
        creator: '彭珍珍',
        type: '细岩',
        status: 1,
      },
      {
        id: '8',
        number: 'GEOLOGY891',
        name: '华北岩土勘查一期工程',
        creator: '彭珍珍',
        type: '珍珠岩',
        status: 2,
      },
    ];
    return (
      <PageHeaderWrapper title="岩土勘察工程管理">
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
                        添加勘察工程
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

export default Project;
