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
        id: 'TFSJ010292',
        fenlei: '该县巡检机构',
        pinlv: 50,
        yaosu: '100万-200万',
        fenceng: '王源',
        state: '启用',
       
    },
    {
        id: 'TFSJ010271',
        fenlei: '该省巡检机构',
        pinlv: 62,
        yaosu: '50万-100万',
        fenceng: '刘艺',
        state: '启用',
       
    },
    {
        id: 'TFSJ010228',
        fenlei: '该县巡检机构',
        pinlv: 65,
        yaosu: '100万-200万',
        fenceng: '李毅',
        state: '启用',
       
    },
    {
        id: 'TFSJ010264',
        fenlei: '第三方巡检机构',
        pinlv: 42,
        yaosu: '10万-50万',
        fenceng: '赵丽',
        state: '启用',
       
    },
    {
        id: 'TFSJ010278',
        fenlei: '第三方巡检机构',
        pinlv: 56,
        yaosu: '100万-200万',
        fenceng: '孟非',
        state: '启用',
       
    },
    {
        id: 'TFSJ010226',
        fenlei: '第三方巡检机构',
        pinlv: 12,
        yaosu: '10万-50万',
        fenceng: '江大',
        state: '启用',
       
    },
    {
        id: 'TFSJ010224',
        fenlei: '该县巡检机构',
        pinlv: 26,
        yaosu: '50万-100万',
        fenceng: '汪峰',
        state: '启用',
       
    },
    {
        id: 'TFSJ010223',
        fenlei: '第三方巡检机构',
        pinlv: 33,
        yaosu: '100万-200万',
        fenceng: '张三三',
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
            title: '巡检机构',
            dataIndex: 'fenlei',
        },
        {
            title: '巡检进度',
            dataIndex: 'pinlv',
            render: (text: number) =>
                <div>
                    <Tooltip title="3 done / 3 in progress / 4 to do">
                        <Progress percent={text} successPercent={text / 2} type="circle" />
                    </Tooltip>
                </div>,

        },
        {
            title: '养护预算',
            dataIndex: 'yaosu',
        },
        {
            title: '巡检负责人',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="#2db7f5">{text}</Tag>,
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
                title="养护日常巡查管理"
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
