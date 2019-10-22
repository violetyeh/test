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
        id: 'BC21',
        fl:'璧渝高速',
        mc:'启用',
        ma:'192 . 01 . 02 . 56 . 05',
        bf:'2019年7月19日18:53:25',
        sf:'6',
        nl:'A',
        dbz:'25',
        state: '启用',
    },
    {
        id: 'BC35',
        fl:'永璧高速',
        mc:'未启用',
        ma:'192 . 01 . 02 . 56 . 02',
        bf:'2019年7月20日12:03:25',
        sf:'7',
        nl:'B',
        dbz:'20',
        state: '启用',
    },
    {
        id: 'BC38',
        fl:'永合高速',
        mc:'启用',
        ma:'192 . 01 . 02 . 56 . 05',
        bf:'2019年7月22日08:56:45',
        sf:'1',
        nl:'B',
        dbz:'10',
        state: '启用',
    },
    {
        id: 'BC21',
        fl:'合璧高速',
        mc:'未启用',
        ma:'192 . 01 . 02 . 56 . 01',
        bf:'2019年7月23日16:23:11',
        sf:'4',
        nl:'A',
        dbz:'12',
        state: '启用',
    },
    {
        id: 'BC37',
        fl:'合津高速',
        mc:'启用',
        ma:'192 . 01 . 02 . 56 . 06',
        bf:'2019年8月01日20:53:25',
        sf:'15',
        nl:'B',
        dbz:'15',
        state: '启用',
    },
    {
        id: 'BC35',
        fl:'津璧高速',
        mc:'启用',
        ma:'192 . 01 . 02 . 56 . 01',
        bf:'2019年8月06日09:14:25',
        sf:'10',
        nl:'A',
        dbz:'18',
        state: '启用',
    },
    {
        id: 'BC64',
        fl:'铜川高速',
        mc:'启用',
        ma:'192 . 01 . 02 . 56 . 01',
        bf:'2019年8月07日19:14:27',
        sf:'15',
        nl:'A',
        dbz:'18',
        state: '启用',
    },
    {
        id: 'BC78',
        fl:'威铜高速',
        mc:'启用',
        ma:'192 . 01 . 02 . 56 . 01',
        bf:'2019年8月08日15:13:47',
        sf:'10',
        nl:'A',
        dbz:'15',
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
            title: '终端编号',
            dataIndex: 'id',
        },
        {
            title: '高速路',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
       
        {
            title: 'IP地址',
            dataIndex: 'ma',
        },
        {
            title: '收费时间',
            dataIndex: 'bf',
           
        },
        {
            title: '收费车道车辆',
            dataIndex: 'sf',
        },
        {
            title: '车型',
            dataIndex: 'nl',
        },
        {
            title: '费用',
            dataIndex: 'dbz',
        },
        {
            title: '状态',
            dataIndex: 'mc',
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
                title="收费终端管理"
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
