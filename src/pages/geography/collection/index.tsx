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
        id: 'DATA-0004',
        xm:'日销售量',
        jg:'3000斤',
        dw:'日销售报表',
        pd:'2019年7月14日',
        state: '启用',
    },
    {
        id: 'DATA-0005',
        xm:'销售总量',
        jg:'70000斤',
        dw:'销售总报表',
        pd:'2019年8月20日',
        state: '启用',
    },
    {
        id: 'DATA-0006',
        xm:'退货量',
        jg:'500斤',
        dw:'退货报表',
        pd:'2019年7月29日',
        state: '启用',
    },
    {
        id: 'DATA-0007',
        xm:'产品库存量',
        jg:'120000斤',
        dw:'库存报表',
        pd:'2019年8月06日',
        state: '启用',
    },
    {
        id: 'DATA-0008',
        xm:'产品出库数量',
        jg:'50000斤',
        dw:'出库报表',
        pd:'2019年7月04日',
        state: '启用',
    },
    {
        id: 'DATA-0001',
        xm:'产品入库数量',
        jg:'30000斤',
        dw:'入库报表',
        pd:'2019年8月09日',
        state: '启用',
    },
    {
        id: 'DATA-0002',
        xm:'产品单价数据',
        jg:'3元/斤',
        dw:'产品单价报表',
        pd:'2019年8月10日',
        state: '启用',
    },
    {
        id: 'DATA-0003',
        xm:'产品日收入',
        jg:'3万元',
        dw:'日收入报表',
        pd:'2019年8月07日',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '数据名称',
            dataIndex: 'xm',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '数据信息',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '数据表',
            dataIndex: 'dw',
        },
        {
            title: '日期',
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
                title="大数据管理"
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
