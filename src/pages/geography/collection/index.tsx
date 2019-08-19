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
        id: 'SSSJ02301',
        jishu: '2300',
        fenceng: '游客',
        leixing: '1256',
        name: '1201',
        state: '启用',
    },
    {
        id: 'SSSJ02302',
        jishu: '1233',
        fenceng: '应用新用户',
        leixing: '1506',
        name: '1024',
        state: '启用',
    },
    {
        id: 'SSSJ02303',
        jishu: '1500',
        fenceng: '应用老用户',
        leixing: '1304',
        name: '1204',
        state: '启用',
    },
    {
        id: 'SSSJ02304',
        jishu: '1623',
        fenceng: '游客',
        leixing: '1507',
        name: '1299',
        state: '启用',
    },
    {
        id: 'SSSJ02305',
        jishu: '1749',
        fenceng: '应用新用户',
        leixing: '1324',
        name: '1105',
        state: '启用',
    },
    {
        id: 'SSSJ02306',
        jishu: '1204',
        fenceng: '应用老用户',
        leixing: '1308',
        name: '1058',
        state: '启用',
    },
    {
        id: 'SSSJ02307',
        jishu: '1749',
        fenceng: '应用新用户',
        leixing: '1323',
        name: '1127',
        state: '启用',
    },
    {
        id: 'SSSJ02308',
        jishu: '1654',
        fenceng: '应用老用户',
        leixing: '1438',
        name: '1518',
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
            title: '访问用户实时量',
            dataIndex: 'name',
        },
        {
            title: '登录用户实时量',
            dataIndex: 'jishu',
        },
        {
            title: '用户类型',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '页面浏览实时量',
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
                title="实时用户管理"
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
