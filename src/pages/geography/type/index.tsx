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
        fenlei: '192.168.11.05',
        pinlv: '80',
        yaosu: '5',
        fenceng: '孟凡',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00071',
        fenlei: '192.168.03.06',
        pinlv: '32',
        yaosu: '2',
        fenceng: '王石',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00028',
        fenlei: '192.168.02.01',
        pinlv: '65',
        yaosu: '5',
        fenceng: '钱萌',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00064',
        fenlei: '192.168.36.20',
        pinlv: '42',
        yaosu: '0.5',
        fenceng: '张琼凡',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00078',
        fenlei: '192.168.12.54',
        pinlv: '56',
        yaosu: '5',
        fenceng: '孟思三',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00026',
        fenlei: '192.168.23.64',
        pinlv: '12',
        yaosu: '1',
        fenceng: '王思',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00024',
        fenlei: '192.168.88.05',
        pinlv: '26',
        yaosu: '7',
        fenceng: '陈思凡',
        state: '启用',
       
    },
    {
        id: 'TD-S-BC00023',
        fenlei: '192.168.1.15',
        pinlv: '33',
        yaosu: '5',
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
            title: '地址',
            dataIndex: 'fenlei',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '流量报警（Mbps）',
            dataIndex: 'pinlv',
           
        },
        {
            title: 'SYN频率报警（包/秒）',
            dataIndex: 'yaosu',
        },
        {
            title: '管理员',
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
                title="主机参数设置"
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
