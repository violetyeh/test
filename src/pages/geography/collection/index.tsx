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
        jishu: '15',
        fenceng: '16',
        leixing: '12',
        name:'30',
        state: '启用',
        lg:'逻辑卷 lv01',
    },
    {
        id: 'D0002',
        jishu: '20',
        fenceng: '20',
        leixing: '14',
        name:'15',
        state: '启用',
        lg:'逻辑卷 lv02',
    },
    {
        id: 'D0003',
        jishu: '25',
        fenceng: '14',
        leixing: '10',
        name:'16',
        state: '启用',
        lg:'逻辑卷 lv01',
    },
    {
        id: 'D0004',
        jishu: '15',
        fenceng: '6',
        leixing: '9',
        name:'15',
        state: '启用',
        lg:'逻辑卷 lv03',
    },
    {
        id: 'D0005',
        jishu: '20',
        fenceng: '5',
        leixing: '9',
        name:'10',
        state: '启用',
        lg:'逻辑卷 lv01',
    },
    {
        id: 'D0006',
        jishu: '10',
        fenceng: '6',
        leixing: '17',
        name:'16',
        state: '启用',
        lg:'逻辑卷 lv04',
    },
    {
        id: 'D0007',
        jishu: '15',
        fenceng: '16',
        leixing: '12',
        name:'14',
        state: '启用',
        lg:'逻辑卷 lv01',
    },
    {
        id: 'D0008',
        jishu: '20',
        fenceng: '12',
        leixing: '10',
        name:'15',
        state: '启用',
        lg:'逻辑卷 lv05',
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
            title: '逻辑卷',
            dataIndex: 'lg',
            render: (text) => <Tag color="black">{text}</Tag>,

        },
        {
            title: '端口号',
            dataIndex: 'jishu',
        },
        {
            title: '会话空闲超时（秒）',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '数据空闲超时（秒）',
            dataIndex: 'leixing',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '连接超时（秒）',
            dataIndex: 'name',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="激活" unCheckedChildren="禁用" />,
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
                title="数据中心设置管理"
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
