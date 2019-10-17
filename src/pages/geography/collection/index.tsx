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
        id: 'WTID0156321',
        fl:'陈永华',
        ma:'居民用水',
        bf:'2019年9月19日18:53:25',
        sf:'17256423016',
        state: '启用',
    },
    {
        id: 'WTID0156335',
        fl:'张永',
        ma:'办公楼用水',
        bf:'2019年9月20日12:03:25',
        sf:'1516662347',
        state: '启用',
    },
    {
        id: 'WTID0156338',
        fl:'刘永合',
        ma:'居民用水',
        bf:'2019年9月22日08:56:45',
        sf:'15765432101',
        state: '启用',
    },
    {
        id: 'WTID0156321',
        fl:'卫璧',
        ma:'工地用水',
        bf:'2019年9月23日16:23:11',
        sf:'1307234154',
        state: '启用',
    },
    {
        id: 'WTID0156337',
        fl:'陆合',
        ma:'居民用水',
        bf:'2019年8月01日20:53:25',
        sf:'15178852415',
        state: '启用',
    },
    {
        id: 'WTID0156335',
        fl:'陈津',
        ma:'居民用水',
        bf:'2019年8月06日09:14:25',
        sf:'12325632110',
        state: '启用',
    },
    {
        id: 'WTID0156364',
        fl:'赵川',
        ma:'居民用水',
        bf:'2019年8月07日19:14:27',
        sf:'17256324515',
        state: '启用',
    },
    {
        id: 'WTID0156378',
        fl:'王威铜',
        ma:'居民用水',
        bf:'2019年8月08日15:13:47',
        sf:'15326472010',
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
            title: '客户卡号',
            dataIndex: 'id',
        },
        {
            title: '客户姓名',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
       
        {
            title: '用水类型',
            dataIndex: 'ma',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '开户时间',
            dataIndex: 'bf',
           
        },
        {
            title: '联系电话',
            dataIndex: 'sf',
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
                title="客户信息"
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
