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
        id: 'DDID04',
        xm:'中储物流测试客户001',
        jg:'入库订单',
        dw:'洗碗机',
        pd:'2019年9月14日',
        state: '启用',
    },
    {
        id: 'DDID05',
        xm:'中储物流测试客户002',
        jg:'出库订单',
        dw:'吹风机',
        pd:'2019年10月14日',
        state: '启用',
    },
    {
        id: 'DDID06',
        xm:'中储物流测试客户003',
        jg:'运输订单',
        dw:'手机',
        pd:'2019年9月12日',
        state: '启用',
    },
    {
        id: 'DDID07',
        xm:'中储物流测试客户004',
        jg:'配送订单',
        dw:'洗衣机',
        pd:'2019年9月06日',
        state: '启用',
    },
    {
        id: 'DDID08',
        xm:'中储物流测试客户005',
        jg:'入库订单',
        dw:'电视机',
        pd:'2019年9月04日',
        state: '启用',
    },
    {
        id: 'DDID01',
        xm:'中储物流测试客户006',
        jg:'出库订单',
        dw:'衣柜',
        pd:'2019年9月09日',
        state: '启用',
    },
    {
        id: 'DDID02',
        xm:'中储物流测试客户007',
        jg:'配送订单',
        dw:'冰箱',
        pd:'2019年9月10日',
        state: '启用',
    },
    {
        id: 'DDID03',
        xm:'中储物流测试客户008',
        jg:'运输订单',
        dw:'电脑',
        pd:'2019年9月07日',
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
            title: '订单号',
            dataIndex: 'id',
        },
        {
            title: '客户码',
            dataIndex: 'xm',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '订单类型',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '货物名称',
            dataIndex: 'dw',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '发货日期',
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
                title="通用列表"
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
