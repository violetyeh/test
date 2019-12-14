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
        fenlei: '3421',
        fenceng: '王宇',
        leixing: '面、点、线',
        yaosu: '整取到图幅',
        state: '启用',
        pinlv: '24616',
    },
    {
        id: 'SER8201',
        fenlei: '1425',
        fenceng: '刘欢',
        leixing: '面、点',
        yaosu: '整取到图幅',
        state: '启用',
        pinlv: '35136',
    },
    {
        id: 'SER3921',
        fenlei: '2108',
        fenceng: '陈平',
        leixing: '线',
        yaosu: '整取到十米',
        state: '启用',
        pinlv: '41231',
    },
    {
        id: 'SER0029',
        fenlei: '1520',
        fenceng: '范萌',
        leixing: '线',
        yaosu: '整取到米',
        state: '启用',
        pinlv: '31694',
    },
    {
        id: 'SER2191',
        fenlei: '3200',
        fenceng: '方现',
        leixing: '点、线、面',
        yaosu: '整取到十米',
        state: '启用',
        pinlv: '31653',
    },
    {
        id: 'SER3321',
        fenlei: '7412',
        fenceng: '王希',
        leixing: '点、线、面',
        yaosu: '整取到米',
        state: '启用',
        pinlv: '23142',
    },
    {
        id: 'SER2191',
        fenlei: '1562',
        fenceng: '刘浩',
        leixing: '点、线、面',
        yaosu: '整取到十米',
        state: '启用',
        pinlv: '30325',
    },
    {
        id: 'SER3321',
        fenlei: '2000',
        fenceng: '江梅',
        leixing: '点、线、面',
        yaosu: '整取到图幅',
        state: '启用',
        pinlv:'23142',
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
            title: '横向图幅尺寸（KM）',
            dataIndex: 'fenlei',
        },
        {
            title: '纵向图幅尺寸（KM)',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '整取操作',
            dataIndex: 'yaosu',
        },
        {
            title: '调查员',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="#2db7f5">{text}</Tag>,
        },
        // {
        //     title: '几何类型',
        //     dataIndex: 'leixing',
        // },

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
                title="图幅"
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
