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
        jishu: '户外广告公司',
        fenceng: '户外/高速/地图',
        leixing: '我要买广告',
        name:'报纸广告在线采购',
        state: '启用',
    },
    {
        id: 'D0002',
        jishu: '电视广告公司',
        fenceng: '电视/卫视/央视',
        leixing: '求购信息大全',
        name:'电视广告在线采购',
        state: '启用',
    },
    {
        id: 'D0003',
        jishu: '广播广告公司',
        fenceng: '广播/交通/省广',
        leixing: '我要买广告',
        name:'广播广告在线采购',
        state: '启用',
    },
    {
        id: 'D0004',
        jishu: '报纸广告公司',
        fenceng: '报纸/晚报/北京',
        leixing: '求购信息大全',
        name:'报纸广告在线采购',
        state: '启用',
    },
    {
        id: 'D0005',
        jishu: '杂志广告公司',
        fenceng: '杂志/航机/时尚',
        leixing: '我要买广告',
        name:'户外广告在线采购',
        state: '启用',
    },
    {
        id: 'D0006',
        jishu: '广告制作公司',
        fenceng: 'LED/屏主/广告主',
        leixing: '发布广告求购',
        name:'报纸广告在线采购',
        state: '启用',
    },
    {
        id: 'D0007',
        jishu: '广告策划公司',
        fenceng: '网络广告/DSP',
        leixing: '求购信息大全',
        name:'电视广告在线采购',
        state: '启用',
    },
    {
        id: 'D0008',
        jishu: '广告设备公司',
        fenceng: '自媒体/公众号/微博',
        leixing: '求购信息大全',
        name:'报纸广告在线采购',
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
            title: '广告商铺',
            dataIndex: 'jishu',
        },
        {
            title: '广告资源分类',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '求购信息',
            dataIndex: 'leixing',
        },
        {
            title: '自媒体项目代理',
            dataIndex: 'name',
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
                title="广告投放管理"
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
