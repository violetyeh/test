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
      title: '广告投放合同名称',
      dataIndex: 'id',
    },
    {
      title: '广告类型',
      dataIndex: 'creator',
    },
    {
      title: '推广商品',
      dataIndex: 'project',
    },
    {
      title: '广告语',
      dataIndex: 'ggy',
    },
    {
      title: '合同是否启用',
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
        id: '广告投放合同',
        creator: '电视广告',
        project: '化妆品广告',
        ggy:'修护明眸娇颜,重拾流金岁月!',
        status: 1,
      },
      {
        id: '广告投放合同',
        creator: '电视广告',
        project: '珠宝广告',
        ggy:'千金一诺，一饰铭记。',
        status: 1,
      },
      {
        id: '广告投放合同',
        creator: '电视广告',
        project: '化妆品广告',
        ggy:'美白,自信新感受!',
        status: 1,
      },
      {
        id: '广告投放合同',
        creator: '电视广告',
        project: '珠宝广告',
        ggy:'炫彩你饰界,只有我知心',
        status: 1,
      },
      {
        id: '广告投放合同',
        creator: '电视广告',
        project: '化妆品广告',
        ggy:'拥有精美化妆,完美体现自我!',
        status: 1,
      },
      {
        id: '广告投放合同',
        creator: '电视广告',
        project: '珠宝广告',
        ggy:'世上仅此一件，今生与你结缘!',
        status: 1,
      },
      {
        id: '广告投放合同',
        creator: '电视广告',
        project: '化妆品广告',
        ggy:'青春亮丽,惟有发佳丽',
        status: 1,
      },
      {
        id: '广告投放合同',
        creator: '电视广告',
        project: '珠宝广告',
        ggy:'见证爱的表白，实现幸福的承诺。',
        status: 1,
      },
     
    ];
    return (
      <PageHeaderWrapper title="广告投放合同管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="广告投放合同名称">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="广告类型">
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
                        添加广告合同
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
