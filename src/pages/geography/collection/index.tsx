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
        jishu: 'WZ12356JG公交站广告位位置',
        fenceng: '张宇',
        leixing: '高档',
        name: '智能家居广告',
        state: '启用',
    },
    {
        id: 'D0002',
        jishu: 'WZ16356JG公交站广告位位置',
        fenceng: '孟凡',
        leixing: '高端',
        name: '奢侈品广告',
        state: '启用',
    },
    {
        id: 'D0003',
        jishu: 'WZ12656JG公交站广告位位置',
        fenceng: '程思',
        leixing: '简洁',
        name: '求职广告',
        state: '启用',
    },
    {
        id: 'D0004',
        jishu: 'WZ12746JG公交站广告位位置',
        fenceng: '齐天',
        leixing: '简洁',
        name: '招聘广告',
        state: '启用',
    },
    {
        id: 'D0005',
        jishu: 'WZ12366JG公交站广告位位置',
        fenceng: '钱偲',
        leixing: '华丽',
        name: '电影宣传广告',
        state: '启用',
    },
    {
        id: 'D0006',
        jishu: 'WZ11256JG公交站广告位位置',
        fenceng: '孟宇思',
        leixing: '高端',
        name: '奢侈品广告',
        state: '启用',
    },
    {
        id: 'D0007',
        jishu: 'WZ112JG公交站广告位位置',
        fenceng: '方艳',
        leixing: '详细',
        name: '招租广告',
        state: '启用',
    },
    {
        id: 'D0008',
        jishu: 'WZ11856JG公交站广告位位置',
        fenceng: '姜宇',
        leixing: '简洁',
        name: '手机广告',
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
            title: '广告主',
            dataIndex: 'fenceng',
        },
        {
            title: '广告位',
            dataIndex: 'jishu',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '设计广告类型',
            dataIndex: 'name',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: ' 广告样式',
            dataIndex: 'leixing',
            render: (text) => <Tag color="green">{text}</Tag>,
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
                title="广告定位"
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
