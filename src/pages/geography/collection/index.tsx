import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Progress } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";
import { Chart, View, Geom, Label } from "bizcharts";
import DataSet from '@antv/data-set';
import dituData from "./mockdata";


interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    currentItem: any;
    data: any[];
}

const mockData = [
    {
        id: 'SPCC-1012001',
        jishu: '100',
        fenceng: '166GB',
        leixing: '210GB',
        name:'30',
        state: '启用',
        lg:'1280*720(720P) ,1.5GB码流',
    },
    {
        id: 'SPCC-1012002',
        jishu: '85',
        fenceng: '145GB',
        leixing: '289GB',
        name:'15',
        state: '启用',
        lg:'1920*1080(1080P),2GB码流',
    },
    {
        id: 'SPCC-1012003',
        jishu: '100',
        fenceng: '147GB',
        leixing: '154GB',
        name:'16',
        state: '启用',
        lg:'1280*720(720P) ,1.5GB码流',
    },
    {
        id: 'SPCC-1012004',
        jishu: '100',
        fenceng: '242GB',
        leixing: '315GB',
        name:'15',
        state: '启用',
        lg:'1920*1080(1080P),2GB码流',
    },
    {
        id: 'SPCC-1012005',
        jishu: '100',
        fenceng: '256GB',
        leixing: '343GB',
        name:'10',
        state: '启用',
        lg:'1280*720(720P) ,1.5GB码流',
    },
    {
        id: 'SPCC-1012006',
        jishu: '98',
        fenceng: '235GB',
        leixing: '342GB',
        name:'16',
        state: '启用',
        lg:'1920*1080(1080P),2GB码流',
    },
    {
        id: 'SPCC-1012007',
        jishu: '88',
        fenceng: '125GB',
        leixing: '258GB',
        name:'14',
        state: '启用',
        lg:'1280*720(720P) ,2GB码流',
    },
    {
        id: 'SPCC-1012008',
        jishu: '24',
        fenceng: '174GB',
        leixing: '247GB',
        name:'15',
        state: '启用',
        lg:'1920*1080(1080P),4GB码流',
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
            title: '存储码流',
            dataIndex: 'lg',
            render: (text) => <Tag color="BLUE">{text}</Tag>,

        },
        
        {
            title: '7天',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '15天',
            dataIndex: 'leixing',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '视频存储进度',
            dataIndex: 'jishu',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '存储器占用率',
            dataIndex: 'name',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="激活" unCheckedChildren="禁用" />,
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
        const { saveVisible, currentItem, data } = this.state;

        return (
            <PageHeaderWrapper
                title="存储服务管理"
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
            </PageHeaderWrapper >
        );
    }
}

export default Type;
