import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";

interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    data: any[];
    currentItem: any;
}

const mockData = [
    {
        id: 'SER1292',
        fenlei: '已经格式化',
        yaosu: '正常',
        state: '启用',
        pinlv: 53,
        sj:'500分钟',
    },
    {
        id: 'SER8201',
        fenlei: '未格式化 ',
        yaosu: '警告',
        state: '启用',
        pinlv: 64,
        sj:'600分钟',
    },
    {
        id: 'SER3921',
        fenlei: '使用中',
        yaosu: '异常',
        state: '启用',
        pinlv: 92,
        sj:'800分钟',
    },
    {
        id: 'SER0029',
        fenlei: '已经格式化',
        yaosu: '正常',
        state: '启用',
        pinlv: 82,
        sj:'600分钟',
    },
    {
        id: 'SER2191',
        fenlei: '未格式化',
        yaosu: '异常',
        state: '启用',
        pinlv: 19,
        sj:'800分钟',
    },
    {
        id: 'SER3321',
        fenlei: '使用中',
        yaosu: '正常',
        state: '启用',
        pinlv: 63,
        sj:'600分钟',
    },
    {
        id: 'SER2136',
        fenlei: '已经格式化',
        yaosu: '异常',
        state: '启用',
        pinlv: 19,
        sj:'800分钟',
    },
    {
        id: 'SER3354',
        fenlei: '已经格式化',
        yaosu: '正常',
        state: '启用',
        pinlv: 54,
        sj:'600分钟',
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
            title: '状态',
            dataIndex: 'fenlei',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '监控进度',
            dataIndex: 'pinlv',
            render: (text: number) =>
                <div>
                    <Tooltip title="3 done / 3 in progress / 4 to do">
                        <Progress percent={text} successPercent={text / 2} type="circle" />
                    </Tooltip>
                </div>,

        },
        {
            title: '容量状态',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '容量宽限时间',
            dataIndex: 'sj',
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
        const { saveVisible, data, currentItem } = this.state;
        return (
            <PageHeaderWrapper
                title="数据中心配额管理"
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

export default Type;
