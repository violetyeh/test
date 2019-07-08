import { Component, Fragment } from 'react';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Divider, message, Card, Table, Form, Col, Row, Button, Input, Switch, Select, Tag, Modal } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Save from './Save';
import styles from '../style.less';
import Detail from './Detail';

interface DataHandleProps { }
interface DataHandleState {
  saveVisible: boolean;
  detailVisible: boolean;
  currentItem: any;
}

class DataHandle extends Component<DataHandleProps, DataHandleState> {
  state: DataHandleState = {
    saveVisible: false,
    detailVisible: false,
    currentItem: {},
  };

  columns: ColumnProps<any>[] = [
    {
      title: '人员编号',
      dataIndex: 'id',
    },
    {
      title: '所属地区',
      dataIndex: 'project',
    },
    {
      title: '姓名',
      dataIndex: 'creator',
    },
    {
      title: '政务文件建立时间',
      dataIndex: 'date',
    },
    {
      title: '人员职务',
      dataIndex: 'type',
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      render: (text) => (<Tag color="red">{text}</Tag>),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.edit(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.setting(record)}>删除</a>
          {/* <Divider type="vertical" />
          <a onClick={() => this.detail(record)}>详情</a> */}
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

  detail = (record) => {
    console.log('数据处理');
    this.setState({
      detailVisible: true,
    })
  }
  render() {
    const { saveVisible, detailVisible, currentItem } = this.state;
    const data = [
      {
        id: 'RY20101',
        project: '南沙区',
        creator: '张林',
        date: '2019-06-21',
        type: '普通员工',
        status: '在岗',
      },
      {
        id: 'RY20102',
        project: '南沙区',
        creator: '黄克',
        date: '2019-06-22',
        type: '管理层',
        status: '休假中',
      },
      {
        id: 'RY20103',
        project: '天河区',
        creator: '张思林',
        date: '2019-06-19',
        type: '普通员工',
        status: '在岗',
      },
      {
        id: 'RY20104',
        project: '天河区',
        date: '2019-06-10',
        creator: '曾平',
        type: '普通员工',
        status: '在岗',
      },
      {
        id: 'RY20105',
        project: '天河区',
        date: '2019-07-05',
        creator: '蒋乐乐',
        type: '管理层',
        status: '在岗',
      },
      {
        id: 'RY20106',
        project: '白云区',
        date: '2019-06-29',
        creator: '王芊芊',
        type: '普通员工',
        status: '休假中',
      },
      {
        id: 'RY20107',
        project: '白云区',
        date: '2019-06-19',
        creator: '钟婷',
        type: '管理层',
        status: '在岗',
      },
      {
        id: 'RY20108',
        project: '白云区',
        date: '2019-06-21',
        creator: '王籽言',
        type: '普通员工',
        status: '在岗',
      },
    ];
    return (
      <PageHeaderWrapper title="政务人员管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="人员编号">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="人员类型">
                    <Select >
                      <Select.Option value="jack">普通员工</Select.Option>
                      <Select.Option value="lucy">管理层</Select.Option>
                    </Select>
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
                        添加政务管理人员
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
        {
          detailVisible && <Detail handleDetailVisible={() => this.setState({ detailVisible: false })} />
        }
      </PageHeaderWrapper>
    );
  }
}

export default DataHandle;
