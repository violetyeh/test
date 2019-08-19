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
        id: 'TD-S-BC00092',
        fenlei: 'GGSJ068线路调度设备',
        pinlv: 80,
        yaosu: '设备操作不卡顿',
        fenceng: '孟凡',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00071',
        fenlei: 'GGSJ014网络调度设备',
        pinlv: 32,
        yaosu: '设备操作流畅',
        fenceng: '王石',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00028',
        fenlei: 'GGSJ023电路调度设备',
        pinlv: 65,
        yaosu: '设备操作不卡顿',
        fenceng: '钱萌',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00064',
        fenlei: 'GGSJ47交换调度设备',
        pinlv: 42,
        yaosu: '操作有效',
        fenceng: '张琼凡',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00078',
        fenlei: 'GGSJ36线路调度设备',
        pinlv: 56,
        yaosu: '设备操作不卡顿',
        fenceng: '孟思三',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00026',
        fenlei: 'GGSJ12网络调度设备',
        pinlv: 12,
        yaosu: '界面操作流畅',
        fenceng: '王思',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00024',
        fenlei: 'GGSJ09线路调度设备',
        pinlv: 26,
        yaosu: '界面操作不卡顿',
        fenceng: '陈思凡',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00023',
        fenlei: 'GGSJ05线路调度设备',
        pinlv: 33,
        yaosu: '设备操作不卡顿',
        fenceng: '张凡',
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
            title: '调度设备名称',
            dataIndex: 'fenlei',
        },
        {
            title: '调度进度',
            dataIndex: 'pinlv',
            render: (text: number) =>
                <div>
                    <Tooltip title="3 done / 3 in progress / 4 to do">
                        <Progress percent={text} successPercent={text / 2} type="circle" />
                    </Tooltip>
                </div>,

        },
        {
            title: '调度设备状态',
            dataIndex: 'yaosu',
        },
        {
            title: '调度负责人',
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
                title="调度设备管理"
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
