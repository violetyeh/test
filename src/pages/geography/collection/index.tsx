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
        fenceng: '百度精准广告投放',
        name: '精准广告投放信息：...',
        leixing: '小视屏',
        jishu: '高奢广告',
        state: '启用',
    },
    {
        id: 'D0002',
        fenceng: '神马精准广告投放',
        name: '精准广告投放信息：...',
        leixing: '小视屏',
        jishu: '高奢广告',
        state: '启用',
    },
    {
        id: 'D0003',
        fenceng: '360精准广告投放',
        name: '精准广告投放信息：...',
        leixing: 'app启动页',
        jishu: '高奢广告',
        state: '启用',
    },
    {
        id: 'D0004',
        fenceng: '搜狗精准广告投放',
        name: '精准广告投放信息：...',
        leixing: 'app启动页',
        jishu: '高奢广告',
        state: '启用',
    },
    {
        id: 'D0005',
        fenceng: '谷歌精准广告投放',
        name: '精准广告投放信息：...',
        leixing: 'app启动页',
        jishu: '高奢广告',
        state: '启用',
    },
    {
        id: 'D0006',
        fenceng: '必应精准广告投放',
        name: '精准广告投放信息：...',
        leixing: '微信公众号',
        jishu: '高奢广告',
        state: '启用',
    },
    {
        id: 'D0007',
        fenceng: '2345精准广告投放',
        name: '精准广告投放信息：...',
        leixing: 'app启动页',
        jishu: '高奢广告',
        state: '启用',
    },
    {
        id: 'D0008',
        fenceng: '火狐精准广告投放',
        name: '精准广告投放信息：...',
        leixing: 'app启动页',
        jishu: '高奢广告',
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
            title: '精准广告投放',
            dataIndex: 'fenceng',
        },
        {
            title: '广告投放信息',
            dataIndex: 'name',
        },
        {
            title: '平台',
            dataIndex: 'leixing',
        },
        {
            title: '广告定位',
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
                title="精准投放管理"
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
