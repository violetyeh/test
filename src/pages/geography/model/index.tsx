import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress } from "antd";
import Search from "./Search";
import Save from "./Save";
import styles from "../style.less";

interface ModelProps {

}

interface ModelState {
    saveVisible: boolean,
    data: any[],
    currentItem: any,
}

const mockData = [
    
    {
        zl: '熟食类',
        mc:'面包',
        sj:'食品无机元素检测单位',
        zb:3.6,
        process: 100,
        status: '启用',
    },
    {
        zl: '零食类',
        mc:'果冻',
        sj:'食品无机元素检测单位',
        zb:3,
        process: 99,
        status: '启用',
    },
    {
        zl: '蔬菜',
        mc:'胡萝卜',
        sj:'食品无机元素检测单位',
        zb:3.1,
        process: 89,
        status: '启用',
    },
    {
        zl: '零食类',
        mc:'饼干',
        sj:'食品无机元素检测单位',
        zb:2.2,
        process: 78,
        status: '启用',
    },
    {
        zl: '肉类',
        mc:'鱼肉',
        sj:'食品无机元素检测单位',
        zb:2,
        process: 65,
        status: '启用',
    },
    {
        zl: '熟食类',
        mc:'火腿肠',
        sj:'食品无机元素检测单位',
        zb:1,
        process: 100,
        status: '启用',
    },
    {
        zl: '蔬菜',
        mc:'白菜',
        sj:'食品无机元素检测单位',
        zb:3,
        process: 32,
        status: '启用',
    },
    {
        zl: '肉类',
        mc:'猪肉',
        sj:'食品无机元素检测单位',
        zb:2,
        process: 28,
        status: '启用',
    },
]

class Model extends Component<ModelProps, ModelState>{
    state: ModelState = {
        saveVisible: false,
        data: mockData,
        currentItem: {},
    }

    columns: ColumnProps<any>[] = [
        {
            title: '样品种类',
            dataIndex: 'zl',
        },
        {
            title: '样品名称',
            dataIndex: 'mc',
        },
        {
            title: '送检单位',
            dataIndex: 'sj',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '无机元素占比',
            dataIndex: 'zb',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '检测结果进度',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },

        {
            title: '是否启用',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
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
        this.setState({
            currentItem: record,
            saveVisible: true,
        });
    }

    delete = (record: any) => {
        message.error('核心数据，无法删除');
    }
    render() {
        const { saveVisible, data, currentItem } = this.state;
        return (
            <PageHeaderWrapper
                title="无机元素检测设置"
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
            </PageHeaderWrapper>
        );
    }
}

export default Model;
