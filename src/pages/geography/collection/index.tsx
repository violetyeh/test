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
        id: 'JZYW02521',
        fl:'璧渝高速收费站',
        mc:'已检',
        ma:'111',
        bf:'2019年10月19日18:53:25',
        sf:'2.6吨',
        nl:'30吨',
        dbz:'0吨',
        state: '启用',
    },
    {
        id: 'JZYW02535',
        fl:'永璧高速收费站',
        mc:'未检',
        ma:'11',
        bf:'2019年10月20日12:03:25',
        sf:'26吨',
        nl:'25吨',
        dbz:'1吨',
        state: '启用',
    },
    {
        id: 'JZYW02538',
        fl:'永合高速收费站',
        mc:'已检',
        ma:'1',
        bf:'2019年10月22日08:56:45',
        sf:'1.38吨',
        nl:'25吨',
        dbz:'0吨',
        state: '启用',
    },
    {
        id: 'JZYW02521',
        fl:'合璧高速收费站',
        mc:'未检',
        ma:'1',
        bf:'2019年10月23日16:23:11',
        sf:'1.54吨',
        nl:'30吨',
        dbz:'0吨',
        state: '启用',
    },
    {
        id: 'JZYW02537',
        fl:'合津高速收费站',
        mc:'已检',
        ma:'11',
        bf:'2019年10月01日20:53:25',
        sf:'1.96吨',
        nl:'25吨',
        dbz:'0吨',
        state: '启用',
    },
    {
        id: 'JZYW02535',
        fl:'津璧高速收费站',
        mc:'已检',
        ma:'111',
        bf:'2019年10月06日09:14:25',
        sf:'3.62吨',
        nl:'30吨',
        dbz:'0吨',
        state: '启用',
    },
    {
        id: 'JZYW02564',
        fl:'铜川高速收费站',
        mc:'已检',
        ma:'111',
        bf:'2019年10月07日19:14:27',
        sf:'1.5吨',
        nl:'30吨',
        dbz:'0吨',
        state: '启用',
    },
    {
        id: 'JZYW02578',
        fl:'威铜高速收费站',
        mc:'已检',
        ma:'111',
        bf:'2019年10月08日15:13:47',
        sf:'2.85吨',
        nl:'30吨',
        dbz:'0吨',
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '收费站',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
       
        {
            title: '轴型组合',
            dataIndex: 'ma',
        },
        {
            title: '计重时间',
            dataIndex: 'bf',
           
        },
        {
            title: '总重',
            dataIndex: 'sf',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '总轴限',
            dataIndex: 'nl',
        },
        {
            title: '超重',
            dataIndex: 'dbz',
        },
        {
            title: '状态',
            dataIndex: 'mc',
            render: (text) => <Tag color="BLACK">{text}</Tag>,
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
                title="计重业务"
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
