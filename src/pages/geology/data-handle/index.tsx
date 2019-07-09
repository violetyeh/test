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
      title: '广告采购招标项目',
      dataIndex: 'id',
    },
    {
      title: '招标金额',
      dataIndex: 'creator',
    },
    {
      title: '信息类别',
      dataIndex: 'project',
    },
    {
      title: '行业',
      dataIndex: 'ggy',
    },
    {
      title: '招标是否完成',
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
        id: '云南省博物馆“金沙水拍云崖暖——红军长征过云南”（暂定名）陈列布展项目招标公告',
        creator: '￥220万',
        project: '招标信息',
        ggy:'广告投放',
        status: 1,
      },
      {
        id: '南岳区2019年深圳北站广告发布项目公开招标公告',
        creator: '￥98万',
        project: '招标信息',
        ggy:'广告投放',
        status: 1,
      },
      {
        id: '黑龙江省福利彩票发行中心_福彩大家乐营销活动公开招标公告',
        creator: '￥1500万',
        project: '招标信息',
        ggy:'广告投放',
        status: 1,
      },
      {
        id: '广西壮族自治区疾病预防控制中心2019年艾滋病预防控制宣传公开招标公告',
        creator: '￥245万',
        project: '招标信息',
        ggy:'广告投放',
        status: 1,
      },
      {
        id: '北京交响乐团2019年“首都市民音乐厅”公益演出项目电视服务宣传采购项目公开招标公告',
        creator: '￥79.77万',
        project: '招标信息',
        ggy:'广告投放',
        status: 1,
      },
      {
        id: '三亚市旅游和文化广电体育局-联合央视四套中文国际频道进行三亚旅游专题宣传项目-公开招标公告',
        creator: '￥1000万',
        project: '招标信息',
        ggy:'广告投放',
        status: 1,
      },
      {
        id: '2019年“就在山城.渝创渝新”就业创业宣传服务采购公告',
        creator: '￥850万',
        project: '招标信息',
        ggy:'广告投放',
        status: 1,
      },
      {
        id: '尤溪县“互联网+油茶”综合服务平台网络推广服务项目招标公告',
        creator: '￥100万',
        project: '招标信息',
        ggy:'广告投放',
        status: 1,
      },
     
    ];
    return (
      <PageHeaderWrapper title="广告投放招标管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="广告采购招标项目">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="招标金额">
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
                        添加广告招标项目
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
