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
      title: '投放渠道',
      dataIndex: 'id',
    },
    {
      title: '类型',
      dataIndex: 'creator',
    },
    {
      title: '媒体名称',
      dataIndex: 'project',
    },
    {
      title: '渠道开关',
      dataIndex: 'status',
      render: (text) => (<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />),
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
        id: '网络媒体',
        creator: '电视',
        project: '中央一套',
        status: 1,
      },
      {
        id: '网络媒体',
        creator: '电脑',
        project: '网页',
        status: 1,
      },
      {
        id: '网络媒体',
        creator: '手机',
        project: 'APP启动页面',
        status: 1,
      },
      {
        id: '各地点站牌',
        creator: '楼宇屏幕',
        project: 'LED屏幕',
        status: 1,
      },
      {
        id: '各地点站牌',
        creator: '公交站牌',
        project: '广告机',
        status: 1,
      },
      {
        id: '各地点站牌',
        creator: '道路广告牌',
        project: '广告牌',
        status: 1,
      },
      {
        id: '新闻报纸',
        creator: '报纸',
        project: '阅读界面',
        status: 1,
      },
      {
        id: '新闻报纸',
        creator: '书本',
        project: '阅读界面',
        status: 1,
      },
     
    ];
    return (
      <PageHeaderWrapper title="广告渠道管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="投放渠道">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="类型">
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
                        添加广告渠道
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
