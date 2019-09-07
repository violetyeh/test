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
        id: 'DP2301201',
        xm:'南京',
        jg:'长沙',
        dw:'200',
        dp:'2019年9月07日',
        pd:'2019年9月10日',
        state: '启用',
        name:'关笑笑',
    },
    {
        id: 'DP2301202',
        xm:'璧山',
        jg:'昆明',
        dw:'300',
        dp:'2019年9月03日',
        pd:'2019年9月10日',
        state: '启用',
        name:'赵云',
    },
    {
        id: 'DP2301203',
        xm:'重庆',
        jg:'云南',
        dw:'120',
        dp:'2019年9月03日',
        pd:'2019年9月07日',
        state: '启用',
        name:'王梦洁',
    },
    {
        id: 'DP2301204',
        xm:'成都',
        jg:'江津',
        dw:'300',
        dp:'2019年9月13日',
        pd:'2019年9月14日',
        state: '启用',
        name:'余天',
    },
    {
        id: 'DP2301205',
        xm:'攀枝花',
        jg:'成都',
        dw:'210',
        dp:'2019年8月13日',
        pd:'2019年8月14日',
        state: '启用',
        name:'赵子涵',
    },
    {
        id: 'DP2301206',
        xm:'潼南',
        jg:'合川',
        dw:'150',
        dp:'2019年9月03日',
        pd:'2019年9月12日',
        state: '启用',
        name:'陈梓童',
    },
    {
        id: 'DP2301207',
        xm:'江津',
        jg:'永川',
        dw:'80',
        dp:'2019年9月05日',
        pd:'2019年9月06日',
        state: '启用',
        name:'姜宇',
    },
    {
        id: 'DP2301208',
        xm:'湖南',
        jg:'浙江',
        dw:'260',
        dp:'2019年9月08日',
        pd:'2019年9月11日',
        state: '启用',
        name:'张峰',
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
            title: '订票单号',
            dataIndex: 'id',
        },
        {
            title: '订票人',
            dataIndex: 'name',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '订票时间',
            dataIndex: 'dp',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '起点',
            dataIndex: 'xm',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '终点',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '票价',
            dataIndex: 'dw',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '发车时间',
            dataIndex: 'pd',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
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
                title="订票信息"
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
