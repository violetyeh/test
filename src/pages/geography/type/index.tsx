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
        id: 'TD-S-BC00071',
        fenlei: '0.31',
        pinlv: 32,
        yaosu: '阀门关闭',
        fenceng: '王石',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00028',
        fenlei: '0.36',
        pinlv: 65,
        yaosu: '阀门开启',
        fenceng: '钱萌',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00064',
        fenlei: '0.42',
        pinlv: 42,
        yaosu: '阀门关闭',
        fenceng: '张琼凡',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00078',
        fenlei: '0.4',
        pinlv: 56,
        yaosu: '阀门开启',
        fenceng: '孟思三',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00026',
        fenlei: '0.3',
        pinlv: 12,
        yaosu: '阀门关闭',
        fenceng: '王思',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00092',
        fenlei: '0.25',
        pinlv: 80,
        yaosu: '阀门开启',
        fenceng: '孟凡',
        state: '启用',
       
    },
    
    {
        id: 'TD-S-BC00024',
        fenlei: '0.35',
        pinlv: 26,
        yaosu: '阀门关闭',
        fenceng: '陈思凡',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00023',
        fenlei: '0.35',
        pinlv: 33,
        yaosu: '阀门开启',
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
            title: '管道压力（MPA）',
            dataIndex: 'fenlei',
        },
        {
            title: '管道流量（m³/h）',
            dataIndex: 'pinlv',
        },
        {
            title: '管道阀门状态',
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
                title="监测对象"
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
