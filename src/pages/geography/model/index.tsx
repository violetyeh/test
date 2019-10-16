import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress } from "antd";
import Search from "./Search";
import Save from "./Save";
import styles from "../style.less";

interface ModelProps {

}

interface ModelState {
    saveVisible: boolean,
    data: any[],
    currentItem: any,
}

const mockData = [
    {
        id: '地方电视台',
        creator: '浙江电视台',
        project: '手机',
        status: 1,
        date:'刘四方',
        process:'86',
      },
      {
        id: '地方电视台',
        creator: '重庆电视台',
        project: '火锅',
        status: 1,
        date:'秦雨田',
        process:'100',
      },
      {
        id: '地方电视台',
        creator: '湖南电视台',
        project: '感冒药',
        status: 1,
        date:'王思雅',
        process:'62',
      },
      {
        id: '中央电视台',
        creator: '中央二台',
        project: '手机',
        status: 1,
        date:'陈兆宇',
        process:'74',
      },
      {
        id: '中央电视台',
        creator: '中央一台',
        project: '牙膏',
        status: 1,
        date:'陆万',
        process:'85',
      },
      {
        id: '中央电视台',
        creator: '新闻频道',
        project: '公益广告',
        status: 1,
        date:'赵宇',
        process:'42',
      },
      {
        id: '购物频道',
        creator: '服饰购物频道',
        project: '连衣裙',
        status: 1,
        date:'陈宗',
        process:'76',
      },
      {
        id: '购物频道',
        creator: '家电购物频道',
        project: '电视机',
        status: 1,
        date:'王明芳',
        process:'98',
      },
   
]

class Model extends Component<ModelProps, ModelState>{
    state: ModelState = {
        saveVisible: false,
        data: mockData,
        currentItem: {},
    }

    columns: ColumnProps<any>[] = [
       
        {
            title: '宣传频道',
            dataIndex: 'id',
          },
          {
            title: '类型',
            dataIndex: 'creator',
          },
          {
            title: '广告商品名称',
            dataIndex: 'project',
          },
          {
            title: '频道开关',
            dataIndex: 'status',
            render: (text) => (<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />),
          },
        {
            title: '频道负责人',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '发布进度',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '操作',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.edit(record)}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.delete(record)}>删除</a>
                </Fragment>
            ),
        },
    ];

    edit = (record: any) => {
        this.setState({
            currentItem: record,
            saveVisible: true,
        });
    }

    delete = (record: any) => {
        message.error('核心数据，无法删除');
    }
    render() {
        const { saveVisible, data, currentItem } = this.state;
        return (
            <PageHeaderWrapper
                title="广告宣传频道管理"
            >
                <Card bordered={false}>
                    <div className={styles.tableListForm}><Search handleSave={() => this.setState({ currentItem: {}, saveVisible: true })} /></div>
                    <Table
                        dataSource={data}
                        columns={this.columns}
                        rowKey={item => item.id}
                    />
                </Card>
                {
                    saveVisible &&
                    <Save
                        currentItem={currentItem}
                        handleSaveVisible={() => this.setState({ saveVisible: false })}
                    />
                }
            </PageHeaderWrapper>
        );
    }
}

export default Model;
