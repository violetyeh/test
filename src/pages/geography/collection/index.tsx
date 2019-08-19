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
        fenceng: '1GHz 主频',
        name: '1024 x 600 分辨率',
        leixing: '内置WIFI',
        jishu: '4G电话/短信功能 移动 ',
        state: '启用',
    },
    {
        id: 'D0002',
        fenceng: 'RK 2918处理器',
        name: '1024 x 800 分辨率',
        leixing: '内置WIFI',
        jishu: '4G电话/短信功能 电信',
        state: '启用',
    },
    {
        id: 'D0003',
        fenceng: '512MB DDR3 RAM',
        name: '2048 x 600 分辨率',
        leixing: 'GSM GPRS',
        jishu: '4G电话/短信功能 联通 ',
        state: '启用',
    },
    {
        id: 'D0004',
        fenceng: '1GHz 主频',
        name: '512 x 600 分辨率',
        leixing: 'GSM GPRS',
        jishu: '4G电话/短信功能 移动 联通 ',
        state: '启用',
    },
    {
        id: 'D0005',
        fenceng: 'RK 2918处理器',
        name: '1024 x 600 分辨率',
        leixing: 'GSM GPRS',
        jishu: '4G电话/短信功能  联通 电信',
        state: '启用',
    },
    {
        id: 'D0006',
        fenceng: '512MB DDR3 RAM',
        name: '2048 x 600 分辨率',
        leixing: '内置WIFI',
        jishu: '4G电话/短信功能 移动 ',
        state: '启用',
    },
    {
        id: 'D0007',
        fenceng: 'RK 2918处理器',
        name: '1024 x 800 分辨率',
        leixing: '内置WIFI',
        jishu: '4G电话/短信功能 移动 联通 电信',
        state: '启用',
    },
    {
        id: 'D0008',
        fenceng: '1GHz 主频',
        name: '1024 x 600 分辨率',
        leixing: 'GSM GPRS',
        jishu: '4G电话/短信功能  电信',
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
            title: '架构',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '显示',
            dataIndex: 'name',
        },
        {
            title: '网络',
            dataIndex: 'leixing',
        },
        {
            title: '通讯',
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
                title="配置项管理"
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
