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
        id: 'JF-DD-011021',
        fl:'12354ADF1SA2',
        mc:'空闲中',
        ma:'192.168.0.100',
        bf:'2019年7月19日18:53:25',
        sf:'176k/s',
        nl:'2019年7月19日20:01:06',
        dbz:'5',
        state: '启用',
    },
    {
        id: 'JF-DD-011035',
        fl:'2A3S6D5Z4D1F',
        mc:'维修中',
        ma:'192.168.0.03',
        bf:'2019年7月20日12:03:25',
        sf:'117k/s',
        nl:'2019年7月20日15:54:21',
        dbz:'3',
        state: '启用',
    },
    {
        id: 'JF-DD-011038',
        fl:'1Z23S5D89D5S',
        mc:'空闲中',
        ma:'192.168.0.05',
        bf:'2019年7月22日08:56:45',
        sf:'180k/s',
        nl:'2019年7月22日12:34:12',
        dbz:'5',
        state: '启用',
    },
    {
        id: 'JF-DD-011021',
        fl:'1Z24D5F6S5W2',
        mc:'维修中',
        ma:'192.168.0.04',
        bf:'2019年7月23日16:23:11',
        sf:'264k/s',
        nl:'2019年7月23日20:53:54',
        dbz:'8',
        state: '启用',
    },
    {
        id: 'JF-DD-011037',
        fl:'3C2V5G8E5W2',
        mc:'上机中',
        ma:'192.168.0.36',
        bf:'2019年8月01日20:53:25',
        sf:'156k/s',
        nl:'2019年8月02日09:04:36',
        dbz:'5',
        state: '启用',
    },
    {
        id: 'JF-DD-011035',
        fl:'1X2F4G5E6W9W5S',
        mc:'空闲中',
        ma:'192.168.0.17',
        bf:'2019年8月06日09:14:25',
        sf:'102k/s',
        nl:'2019年8月06日15:53:14',
        dbz:'8',
        state: '启用',
    },
    {
        id: 'JF-DD-011064',
        fl:'125DS3S7S5F',
        mc:'空闲中',
        ma:'192.168.0.01',
        bf:'2019年8月07日19:14:27',
        sf:'150k/s',
        nl:'2019年8月07日22:28:34',
        dbz:'8',
        state: '启用',
    },
    {
        id: 'JF-DD-011078',
        fl:'9SD6F54FD2S',
        mc:'上机中',
        ma:'192.168.0.21',
        bf:'2019年8月08日15:13:47',
        sf:'100k/s',
        nl:'2019年8月08日20:43:34',
        dbz:'5',
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
            title: '计算机名称',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '状态',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: 'IP地址',
            dataIndex: 'ma',
        },
        {
            title: '上机时间',
            dataIndex: 'bf',
           
        },
        {
            title: '网速流量',
            dataIndex: 'sf',
        },
        {
            title: '下机时间',
            dataIndex: 'nl',
        },
        {
            title: '价格（小时/元）',
            dataIndex: 'dbz',
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
                title="订单维护管理"
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
