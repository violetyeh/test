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
        id: 'YIDS0191',
        date: '乡道',
        model: '正向单向通行',
        type: '否',
        status: '启用',
        pinlv: '081乡道',
        process: 3,
    },
    {
        id: 'YIDS2SI1',
        date: '县道',
        model: '不通',
        type: '否',
        status: '启用',
        pinlv: '盘龙路',
        process: 8,
    },
    {
        id: 'YIDS0122',
        date: '省道',
        model: '正向单向通行',
        type: '否',
        status: '启用',
        pinlv: '袁茄路',
        process: 3,
    },
    {
        id: 'YIDS2S12',
        date: '县道',
        model: '逆向单向通行',
        type: '否',
        status: '启用',
        pinlv: '翼龙路',
        process: 8,
    },
    {
        id: 'YIDS01IOS',
        date: '县道',
        model: '双向通行',
        type: '是',
        status: '启用',
        pinlv: '长江二路',
        process: 9,
    },
    {
        id: 'YSIW9s1',
        date: '省道',
        model: '逆向单向通行',
        type: '否',
        status: '启用',
        pinlv: '富洲路',
        process: 7,
    },
    {
        id: 'YID80SJ',
        date: '国道',
        model: '双向通行',
        type: '否',
        status: '启用',
        pinlv: '石小路',
        process: 6,
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '公路名称',
            dataIndex: 'pinlv',
        },
        {
            title: '公路类型',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '是否单行道',
            dataIndex: 'model',
        },
        {
            title: '是否立交',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '桥梁、隧道占比',
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
                title="静态道路信息"
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
