import { Component, Fragment } from 'react';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Divider, message, Card, Table, Form, Col, Row, Button, Input, Switch } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Save from './Save';
import styles from '../style.less';

interface DataManagerProps { }
interface DataManagerState {
  saveVisible: boolean;
  data: any[];
  currentItem: any;
}

class DataManager extends Component<DataManagerProps, DataManagerState> {
  state: DataManagerState = {
    saveVisible: false,
    data: [],
    currentItem: {},
  };

  columns: ColumnProps<any>[] = [
    {
      title: '媒体名称',
      dataIndex: 'id',
    },
    {
      title: '价格',
      dataIndex: 'time',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '形式',
      dataIndex: 'creator',
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
    this.setState({
      currentItem: record,
      saveVisible: true,
    })
  };

  setting = (record: any) => {
    message.error('系统处于离线状态，无法进行此操作');
  };
  render() {
    const { saveVisible, currentItem } = this.state;
    const data = [
      {
        id: 'CCTV我爱你中华《传奇演说家》栏目招商，CCTV我爱你中华《传奇演说家》栏目招商推荐第一季全国总决赛预计在一月份在CCTV我爱你中华录制并播出',
        time:'￥9600000.00',
        type: '网综',
        creator: '冠名',
      },
      {
        id: '世界旅游小姐中国区总决赛招商 世界旅游小姐中国区总决赛招商 世界旅游小姐中国区总决赛招商，多种形式合作~',
        time:'￥8800000.00',
        type: '体育赛事',
        creator: 'Logo展示',
      },
      {
        id: '旅游卫视《文旅之声》栏目全国首档大型文旅互动类综艺节目招商 冠名赞助 国家政策支持党的十八大以来，习近平总书记强调“ 要坚定文化自...',
        time:'￥3600000.00',
        type: '电视剧植入',
        creator: '冠名',
      },
      {
        id: '“拳星汇”职业拳击赛事招商“拳星汇”职业拳击赛事招商 勇敢、坚持、热爱，汇聚无限可能！',
        time:'￥3120000.00',
        type: '体育赛事',
        creator: 'Logo展示',
      },
      {
        id: '首届海峡国际合唱作曲大赛冠名招标',
        time:'￥600000.00',
        type: '音乐演出',
        creator: '冠名',
      },
      {
        id: '香港卫视旅游台，旅游探访类节目《远行》',
        time:'￥520000.00',
        type: '体育赛事',
        creator: 'Logo展示',
      },
      {
        id: 'CCTV老故事频道《信用中国》栏目招嘉宾',
        time:'￥240000.00',
        type: '电视剧植入',
        creator: '口播',
      },
      {
        id: '湖南电视台《种草吧 麻麻》',
        time:'￥120000.00',
        type: '电视剧植入',
        creator: '参演',
      },
     
    ];
    return (
      <PageHeaderWrapper title="招商数据编辑">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="媒体名称">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="形式">
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
                        添加广告招商数据
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
      </PageHeaderWrapper>
    );
  }
}

export default DataManager;
