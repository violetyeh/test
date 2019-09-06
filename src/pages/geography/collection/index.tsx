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
        id: 'D0001',
        fenceng: 'FK02348',
        name: '王晓宇',
        leixing: '自助购票机',
        jishu: '196.1.02.19.01',
        state: '启用',
    },
    {
        id: 'D0002',
        fenceng: 'FK02349',
        name: '赵王',
        leixing: '自助购票机',
        jishu: '196.1.02.19.02',
        state: '启用',
    },
    {
        id: 'D0003',
        fenceng: 'FK02350',
        name: '吴柆',
        leixing: '购票APP',
        jishu: '196.1.02.19.56',
        state: '启用',
    },
    {
        id: 'D0004',
        fenceng: 'FK02351',
        name: '周俊凯',
        leixing: '购票APP',
        jishu: '196.1.02.19.38',
        state: '启用',
    },
    {
        id: 'D0005',
        fenceng: 'FK02352',
        name: '孟凡',
        leixing: '购票APP',
        jishu: '196.1.02.19.47',
        state: '启用',
    },
    {
        id: 'D0006',
        fenceng: 'FK02353',
        name: '赵云出',
        leixing: '自助购票机',
        jishu: '196.1.02.19.03',
        state: '启用',
    },
    {
        id: 'D0007',
        fenceng: 'FK02354',
        name: '李梦洁',
        leixing: '购票APP',
        jishu: '196.1.02.19.04',
        state: '启用',
    },
    {
        id: 'D0008',
        fenceng: 'FK02356',
        name: '王三三',
        leixing: '购票APP',
        jishu: '196.1.02.19.01',
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '访客',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '真实姓名',
            dataIndex: 'name',
        },
        {
            title: '来源',
            dataIndex: 'leixing',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: 'IP地址',
            dataIndex: 'jishu',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
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
                title="购票访客信息"
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
