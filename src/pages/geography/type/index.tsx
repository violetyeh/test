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
        id: 'S-A-N-1292',
        fenlei: '不在线',
        yaosu: '是',
        state: '启用',
        pinlv: '0x75FDFS5DF4G',
        sj:'3500',
    },
    {
        id: 'S-A-N-8201',
        fenlei: '在线 ',
        yaosu: '是',
        state: '启用',
        pinlv: '0xX9C8DFS5SDF',
        sj:'2500',
    },
    {
        id: 'S-A-N-3921',
        fenlei: '在线',
        yaosu: '否',
        state: '启用',
        pinlv: '0x7XDF5DSX2C',
        sj:'1500',
    },
    {
        id: 'S-A-N-0029',
        fenlei: '不在线',
        yaosu: '是',
        state: '启用',
        pinlv: '0x63XC4D5DS5F',
        sj:'1600',
    },
    {
        id: 'S-A-N-2191',
        fenlei: '在线',
        yaosu: '否',
        state: '启用',
        pinlv: '0x34ASWDVC85',
        sj:'2800',
    },
    {
        id: 'S-A-N-3321',
        fenlei: '在线',
        yaosu: '是',
        state: '启用',
        pinlv: '0xA8S9DS5D2F',
        sj:'1600',
    },
    {
        id: 'S-A-N-2136',
        fenlei: '不在线',
        yaosu: '否',
        state: '启用',
        pinlv: '0x73ADF56D5202S',
        sj:'8500',
    },
    {
        id: 'S-A-N-3354',
        fenlei: '不在线',
        yaosu: '是',
        state: '启用',
        pinlv: '0x73A5D6FD52X4F',
        sj:'6050',
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
            title: 'GUID',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '是否分配',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '容量(GB)',
            dataIndex: 'sj',
        }, 
        {
            title: '状态',
            dataIndex: 'fenlei',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },

        {
            title: '永久保留',
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
                title="数据资源属性管理"
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
