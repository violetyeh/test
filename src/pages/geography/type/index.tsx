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
        id: 'JZGG010278',
        fenlei: '管理员',
        pinlv: 56,
        yaosu: '自助购票机客服',
        fenceng: '20',
        state: '启用',
       
    },
    {
        id: 'JZGG010226',
        fenlei: '客服',
        pinlv: 12,
        yaosu: '未分组',
        fenceng: '50',
        state: '启用',
       
    },
    {
        id: 'JZGG010224',
        fenlei: '管理员',
        pinlv: 26,
        yaosu: 'APP购票客服',
        fenceng: '50',
        state: '启用',
       
    },
    {
        id: 'JZGG010223',
        fenlei: '客服',
        pinlv: 33,
        yaosu: '自助购票机客服',
        fenceng: '20',
        state: '启用',
       
    },
    {
        id: 'JZGG010292',
        fenlei: '客服',
        pinlv: 50,
        yaosu: '自助购票机客服',
        fenceng: '20',
        state: '启用',
       
    },
    {
        id: 'JZGG010271',
        fenlei: '客服',
        pinlv: 62,
        yaosu: 'APP购票客服',
        fenceng: '30',
        state: '启用',
       
    },
    {
        id: 'JZGG010228',
        fenlei: '客服',
        pinlv: 65,
        yaosu: '自助购票机客服',
        fenceng: '20',
        state: '启用',
       
    },
    {
        id: 'JZGG010264',
        fenlei: '管理员',
        pinlv: 42,
        yaosu: '未分组',
        fenceng: '50',
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
            title: '角色',
            dataIndex: 'fenlei',
        },
       
        {
            title: '所属分组',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '接待人数',
            dataIndex: 'fenceng',
        },
        // {
        //     title: '几何类型',
        //     dataIndex: 'leixing',
        // },
        {
            title: '分配进度',
            dataIndex: 'pinlv',
            render: (text: number) =>
                <div>
                    <Tooltip title="3 done / 3 in progress / 4 to do">
                        <Progress percent={text} successPercent={text / 2} type="circle" />
                    </Tooltip>
                </div>,

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
                title="客服分配设置"
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
