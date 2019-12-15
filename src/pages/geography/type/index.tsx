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
        fenlei: '高解算旋转参数',
        pinlv: -63.2541,
        yaosu: '136.36587',
        fenceng: '-36.2541',
        state: '启用',
       
    },
    {
        id: 'TFSJ010271',
        fenlei: '七参数',
        pinlv: 389.2145,
        yaosu: '326.0214',
        fenceng: '88.3214',
        state: '启用',
       
    },
    {
        id: 'TFSJ010228',
        fenlei: '高解算旋转参数',
        pinlv: 65.2145,
        yaosu: '-36.2140',
        fenceng: '36.2158',
        state: '启用',
       
    },
    {
        id: 'TFSJ010264',
        fenlei: '四参数',
        pinlv: -63.32145,
        yaosu: '254.32581',
        fenceng: '36.2145',
        state: '启用',
       
    },
    {
        id: 'TFSJ010278',
        fenlei: '四参数',
        pinlv: 1.2356,
        yaosu: '3652.02145',
        fenceng: '23.2147',
        state: '启用',
       
    },
    {
        id: 'TFSJ010226',
        fenlei: '高解算旋转参数',
        pinlv: 12.365,
        yaosu: '-3.25741',
        fenceng: '21.02541',
        state: '启用',
       
    },
    {
        id: 'TFSJ010224',
        fenlei: '七参数',
        pinlv: 26.3651,
        yaosu: '364.2574',
        fenceng: '-1.2547',
        state: '启用',
       
    },
    {
        id: 'TFSJ010223',
        fenlei: '高解算旋转参数',
        pinlv: -321.254,
        yaosu: '214.25547',
        fenceng: '-36.241',
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
            title: '参数区域说明',
            dataIndex: 'fenlei',
        },
        {
            title: 'X平移',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="#2db7f5">{text}</Tag>,
            

        },
        {
            title: 'Y平移',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="#2db7f5">{text}</Tag>,
        },
        {
            title: 'Z平移',
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
                title="转换参数编辑"
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
