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
        id: 'LUMC0211',
        fenceng: '空间直角坐标',
        name: '大地坐标',
        leixing: '批量反算',
        jishu: '待转换',
        state: '启用',
    },
    {
        id: 'LUMC0212',
        fenceng: '大地坐标',
        name: '平面坐标',
        leixing: '批量反算',
        jishu: '待转换',
        state: '启用',
    },
    {
        id: 'LUMC0213',
        fenceng: '平面坐标',
        name: '空间直角坐标',
        leixing: '批量反算',
        jishu: '待转换',
        state: '启用',
    },
    {
        id: 'LUMC0214',
        fenceng: '平面坐标',
        name: '大地坐标',
        leixing: '批量反算',
        jishu: '已转换',
        state: '启用',
    },
    {
        id: 'LUMC0215',
        fenceng: '空间直角坐标',
        name: '大地坐标',
        leixing: '批量反算',
        jishu: '待转换',
        state: '启用',
    },
    {
        id: 'LUMC0216',
        fenceng: '大地坐标',
        name: '平面坐标',
        leixing: '批量正算',
        jishu: '转换不成功',
        state: '启用',
    },
    {
        id: 'LUMC0217',
        fenceng: '平面坐标',
        name: '空间直角坐标',
        leixing: '批量反算',
        jishu: '已转换',
        state: '启用',
    },
    {
        id: 'LUMC0218',
        fenceng: '大地坐标',
        name: '空间直角坐标',
        leixing: '批量正算',
        jishu: '待转换',
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
            title: '源坐标类型',
            dataIndex: 'fenceng',
        },
        {
            title: '转换坐标类型',
            dataIndex: 'name',
        },
        {
            title: ' 批量转换',
            dataIndex: 'leixing',
        },
        {
            title: '状态',
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
                title="坐标转换"
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
