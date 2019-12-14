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
        id: 'TFSJ010278',
        fenlei: '60米',
        pinlv: 56,
        yaosu: 'LK01',
        fenceng: '孟非',
        state: '启用',
       
    },
    {
        id: 'TFSJ010226',
        fenlei: '25米',
        pinlv: 12,
        yaosu: 'RK36',
        fenceng: '江大',
        state: '启用',
       
    },
    {
        id: 'TFSJ010224',
        fenlei: '45米',
        pinlv: 26,
        yaosu: 'LK03',
        fenceng: '汪峰',
        state: '启用',
       
    },
    {
        id: 'TFSJ010223',
        fenlei: '30米',
        pinlv: 33,
        yaosu: 'RK21',
        fenceng: '张三三',
        state: '启用',
       
    },
    {
        id: 'TFSJ010292',
        fenlei: '50米',
        pinlv: 50,
        yaosu: 'RK023',
        fenceng: '王源',
        state: '启用',
       
    },
    {
        id: 'TFSJ010271',
        fenlei: '30米',
        pinlv: 62,
        yaosu: 'LK04',
        fenceng: '刘艺',
        state: '启用',
       
    },
    {
        id: 'TFSJ010228',
        fenlei: '45米',
        pinlv: 65,
        yaosu: 'RK63',
        fenceng: '李毅',
        state: '启用',
       
    },
    {
        id: 'TFSJ010264',
        fenlei: '50米',
        pinlv: 42,
        yaosu: 'LK32',
        fenceng: '赵丽',
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
            title: '桩间隔',
            dataIndex: 'fenlei',
        },
        {
            title: '绘制进度',
            dataIndex: 'pinlv',
            render: (text: number) =>
                <div>
                    <Tooltip title="3 done / 3 in progress / 4 to do">
                        <Progress percent={text} successPercent={text / 2} type="circle" />
                    </Tooltip>
                </div>,

        },
        {
            title: '桩号',
            dataIndex: 'yaosu',
        },
        {
            title: '负责人',
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
                title="公路征地边线"
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
