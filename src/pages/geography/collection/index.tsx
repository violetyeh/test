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
        id: 'CEL0001',
        jishu: '闽侯',
        fenceng: '凤城',
        leixing: '洋里',
        name: '福州',
        state: '启用',
    },
    {
        id: 'CEL0002',
        jishu: '连江',
        fenceng: '敖江',
        leixing: '竹岐',
        name: '南昌',
        state: '启用',
    },
    {
        id: 'CEL0003',
        jishu: '罗源',
        fenceng: '东湖',
        leixing: '南通',
        name: '九江',
        state: '启用',
    },
    {
        id: 'CEL0004',
        jishu: '闽清',
        fenceng: '浦口',
        leixing: '尚干',
        name: '鹰潭',
        state: '启用',
    },
    {
        id: 'CEL0005',
        jishu: '永泰',
        fenceng: '东岱',
        leixing: '南屿',
        name: '上饶',
        state: '启用',
    },
    {
        id: 'CEL0006',
        jishu: '平潭',
        fenceng: '晓澳',
        leixing: '青口',
        name: '景德',
        state: '启用',
    },
    {
        id: 'CEL0007',
        jishu: '仓山',
        fenceng: '丹阳',
        leixing: '白沙',
        name: '新余',
        state: '启用',
    },
    {
        id: 'CEL0008',
        jishu: '晋安',
        fenceng: '长龙',
        leixing: '荆溪',
        name: '鹰潭',
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
            title: '市地',
            dataIndex: 'name',
        },
        {
            title: '县区',
            dataIndex: 'jishu',
        },
        {
            title: '乡镇',
            dataIndex: 'fenceng',
        },
        {
            title: '村',
            dataIndex: 'leixing',
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
                title="权属信息"
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
