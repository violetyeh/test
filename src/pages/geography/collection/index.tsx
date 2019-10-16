import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";
import { Chart, View, Geom, Label } from "bizcharts";
import DataSet from '@antv/data-set';
import dituData from "./mockdata";


interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    currentItem: any;
    data: any[];
}

const mockData = [
   
      {
        id: '商业广告',
        name: '百雀羚系列',
        type: 'P',
        date: '化妆品',
        creator: '百雀羚',
        column:'10秒广告',
        status: 10,
      },
      {
        id: '公益广告',
        name: '公安部',
        type: 'v0890',
        date: '公益',
        creator: '警民同心 平安春节',
        column:'30秒广告',
        status: 30,
      },
      {
        id: '公益广告',
        name: 'CCTV',
        type: 'v0891',
        date: '公益',
        creator: '战斗英雄张富清',
        column:'17秒广告',
        status: 17,
      },
      {
        id: '珠宝广告',
        name: '周六福',
        type: 'P',
        date: '珠宝',
        creator: '黄金',
        column:'20秒广告',
        status: 20,
      },
      {
        id: '珠宝广告',
        name: '周六福',
        type: 'P',
        date: '珠宝',
        creator: '钻石',
        column:'15秒广告',
        status: 15,
      },
      {
        id: '商业广告',
        name: 'OLAY净白系列',
        type: 'P',
        date: '化妆品',
        creator: 'OLAY',
        column:'30秒广告',
        status: 30,
      },
      {
        id: '商业广告',
        name: 'SK-II系列',
        type: 'P',
        date: '化妆品',
        creator: 'SK-II',
        column:'9秒广告',
        status: 9,
      },
      {
        id: '商业广告',
        name: '佰草集系列',
        type: 'P',
        date: '化妆品',
        creator: '佰草集',
        column:'16秒广告',
        status: 16,
      },
]

class Type extends Component<TypeProps, TypeState>{

    state: TypeState = {
        saveVisible: false,
        data: mockData,
        currentItem: {},
    }

    columns: ColumnProps<any>[] = [
        {
            title: '广告类型',
            dataIndex: 'id',
            render: (text) => <Tag color="magenta">{text}</Tag>,
          },
          {
            title: '名称',
            dataIndex: 'name',
          },
          {
            title: '版本',
            dataIndex: 'type',
          },
          {
            title: '上级分类',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
          },
          {
            title: '下级分类',
            dataIndex: 'creator',
            render: (text) => <Tag color="magenta">{text}</Tag>,
          },
          {
            title: '栏目类型',
            dataIndex: 'column',
          },
          {
            title: '定义长度（秒）',
            dataIndex: 'status',
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
        console.log(record, 'res');
        this.setState({
            currentItem: record,
            saveVisible: true,
        });
    }

    delete = (record: any) => {
        message.error('核心数据，无法删除');
    }

    render() {
        const { saveVisible, currentItem, data } = this.state;

        return (
            <PageHeaderWrapper
                title="电视广告管理"
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
            </PageHeaderWrapper >
        );
    }
}

export default Type;
