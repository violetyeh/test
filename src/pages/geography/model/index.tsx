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
        id: 'JKSB-02358S0J',
        date: '218.207.107.21',
        type: '50',
        status: '启用',
        pinlv: '1路IP-Video',
        process: 23,
    },
    {
        id: 'JKSB-023572IK',
        date: '218.207.107.03',
        type: '150',
        status: '启用',
        pinlv: 'KMH4400式PCDVR',
        process: 54,
    },
    {
        id: 'JKSB-023563JJ',
        date: '218.207.107.17',
        type: '100',
        status: '启用',
        pinlv: '4路IP-Video',
        process: 44,
    },
    {
        id: 'JKSB-02350191',
        date: '218.207.107.12',
        type: '60',
        status: '启用',
        pinlv: '1路IP-Video',
        process: 30,
    },
    {
        id: 'JKSB-02352SI1',
        date: '218.207.107.05',
        type: '110',
        status: '启用',
        pinlv: '嵌入式DVR',
        process: 88,
    },
    {
        id: 'JKSB-023501IOS',
        date: '218.207.107.56',
        type: '560',
        status: '启用',
        pinlv: '4路IP-Video',
        process: 90,
    },
    {
        id: 'JKSB-02359s1',
        date: '218.207.107.24',
        type: '110',
        status: '启用',
        pinlv: 'KMH4400式PCDVR',
        process: 70,
    },
    {
        id: 'JKSB-023580SJ',
        date: '218.207.107.36',
        type: '50',
        status: '启用',
        pinlv: '嵌入式DVR',
        process: 67,
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '设备型号',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: 'IP地址',
            dataIndex: 'date',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '监控设备存储量（GB）',
            dataIndex: 'type',
        },
        {
            title: '剩余空间',
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
                title="监控设备管理"
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
