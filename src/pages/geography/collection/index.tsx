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
        fenceng: '百度搜索广告',
        name: '今日头条信息流',
        leixing: '腾讯社交广告',
        jishu: '线上投放',
        state: '启用',
    },
    {
        id: 'D0002',
        fenceng: '神马搜索广告',
        name: 'UC头条信息流',
        leixing: '陌陌广告',
        jishu: '线上投放',
        state: '启用',
    },
    {
        id: 'D0003',
        fenceng: '360搜索广告',
        name: '一点资讯信息流',
        leixing: '朋友圈广告',
        jishu: '线上投放',
        state: '启用',
    },
    {
        id: 'D0004',
        fenceng: '搜狗搜索广告',
        name: '网易新闻信息流',
        leixing: 'QQ空间广告',
        jishu: '线上投放',
        state: '启用',
    },
    {
        id: 'D0005',
        fenceng: '谷歌搜索广告',
        name: '抖音广告信息流',
        leixing: '新浪微博广告',
        jishu: '线上投放',
        state: '启用',
    },
    {
        id: 'D0006',
        fenceng: '必应搜索广告',
        name: '快手广告信息流',
        leixing: '微信公众号广告',
        jishu: '线上投放',
        state: '启用',
    },
    {
        id: 'D0007',
        fenceng: '2345搜索广告',
        name: '百度信息流',
        leixing: '腾讯社交广告',
        jishu: '线上投放',
        state: '启用',
    },
    {
        id: 'D0008',
        fenceng: '火狐搜索广告',
        name: '今日头条信息流',
        leixing: '腾讯社交广告',
        jishu: '线上投放',
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
            title: '搜索广告',
            dataIndex: 'fenceng',
        },
        {
            title: '信息流广告',
            dataIndex: 'name',
        },
        {
            title: ' 社交广告',
            dataIndex: 'leixing',
        },
        {
            title: '广告投放',
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
                title="投放信息管理"
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
