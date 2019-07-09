import { Component, Fragment } from 'react';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Divider, message, Card, Table, Form, Col, Row, Button, Input, Switch, Select, Tag, Modal, Progress } from 'antd';
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
      title: '广告来源',
      dataIndex: 'id',
    },
    {
      title: '媒体名称',
      dataIndex: 'creator',
    },
    {
      title: '网页率',
      dataIndex: 'project',
      render: (text) => <Progress percent={text} project="active" />,
    },
    {
      title: '新闻率',
      dataIndex: 'ggy',
      render: (text) => <Progress percent={text} ggy="active" />,
    },
    {
      title: '投放是否成功',
      dataIndex: 'status',
      render: (text) => (<Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />),
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
        id: '平台客户',
        creator: '搜狐网媒体新闻',
        project: 56,
        ggy:78,
        status: 1,
      },
      {
        id: '平台客户',
        creator: '中华网科技',
        project: 23,
        ggy:46,
        status: 1,
      },
      {
        id: '平台客户',
        creator: '凤凰网江苏',
        project: 33,
        ggy:13,
        status: 1,
      },
      {
        id: '平台客户',
        creator: '中国贸易新闻网',
        project: 45,
        ggy:26,
        status: 1,
      },
      {
        id: '平台客户',
        creator: '飞象网',
        project: 65,
        ggy:36,
        status: 1,
      },
      {
        id: '平台客户',
        creator: '黔讯网',
        project: 68,
        ggy:45,
        status: 1,
      },
      {
        id: '平台客户',
        creator: '北国网',
        project: 65,
        ggy:64,
        status: 1,
      },
      {
        id: '平台客户',
        creator: '华声在线',
        project: 13,
        ggy:33,
        status: 1,
      },
     
    ];
    return (
      <PageHeaderWrapper title="广告来源管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="广告来源">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="媒体名称">
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
                        添加广告来源类型
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
