import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Progress } from "antd";
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
        id: 'WJYS6321',
        mc:'S',
        tiji2:'蛋白粉',
        zhiliang:'150.00',
        zb:30,
        state: '启用',
    },
    {
        id: 'WJYS6322',
        mc:'Fe',
        tiji2:'蛋糕',
        zhiliang:'50.00',
        zb:23,
        state: '启用',
    },
    {
        id: 'WJYS6323',
        mc:'P',
        tiji2:'面包',
        zhiliang:'100.00',
        zb:3,
        state: '启用',
    },
    {
        id: 'WJYS6324',
        mc:'Fe',
        tiji2:'糖果',
        zhiliang:'110.00',
        zb:5,
        state: '启用',
    },
    {
        id: 'WJYS6325',
        mc:'P',
        tiji2:'薯片',
        zhiliang:'30.00',
        zb:1,
        state: '启用',
    },
    {
        id: 'WJYS6326',
        mc:'Fe',
        tiji2:'果冻',
        zhiliang:'20.00',
        zb:4,
        state: '启用',
    },
    {
        id: 'WJYS6327',
        mc:'P',
        tiji2:'方便面',
        zhiliang:'200.00',
        zb:1,
        state: '启用',
    },
    {
        id: 'WJYS6328',
        mc:'S',
        tiji2:'鸡腿',
        zhiliang:'250.00',
        zb:3,
        state: '启用',
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
            title: '检测编号',
            dataIndex: 'id',
        },
        {
            title: '无机元素名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '检测食物',
            dataIndex: 'tiji2',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '食物质量',
            dataIndex: 'zhiliang',
        },
        {
            title: '无机元素占比',
            dataIndex: 'zb',
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
                title="无机元素检测参数管理"
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
