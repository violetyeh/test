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
        zl: '肉类',
        mc:'鸭肉',
        sj:'食品微生物检测单位',
        js:'0.12',
        qw:'无味',
        dx:'2',
        process: 100,
        status: '启用',
    },
    {
        zl: '肉类',
        mc:'兔肉',
        sj:'食品微生物检测单位',
        js:'0.2',
        qw:'刺鼻',
        dx:'6',
        process: 99,
        status: '启用',
    },
    {
        zl: '蔬菜',
        mc:'胡萝卜',
        sj:'食品微生物检测单位',
        js:'0.3',
        qw:'刺鼻',
        dx:'2',
        process: 89,
        status: '启用',
    },
    {
        zl: '蔬菜',
        mc:'茄子',
        sj:'食品微生物检测单位',
        js:'0.2',
        qw:'无味',
        dx:'3',
        process: 78,
        status: '启用',
    },
    {
        zl: '肉类',
        mc:'鱼肉',
        sj:'食品微生物检测单位',
        js:'0.4',
        qw:'无味',
        dx:'2',
        process: 65,
        status: '启用',
    },
    {
        zl: '肉类',
        mc:'鸡肉',
        sj:'食品微生物检测单位',
        js:'0.2',
        qw:'刺鼻',
        dx:'2',
        process: 100,
        status: '启用',
    },
    {
        zl: '蔬菜',
        mc:'白菜',
        sj:'食品微生物检测单位',
        js:'0.3',
        qw:'无味',
        dx:'0',
        process: 32,
        status: '启用',
    },
    {
        zl: '肉类',
        mc:'猪肉',
        sj:'食品微生物检测单位',
        js:'0.1',
        qw:'刺鼻',
        dx:'3',
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
            title: '菌落计数',
            dataIndex: 'js',
        },
        {
            title: '气味',
            dataIndex: 'qw',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '大小',
            dataIndex: 'dx',
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
                title="微生物检测设置"
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
