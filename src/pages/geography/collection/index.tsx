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
        id: 'GSJK05',
        jishu: '100',
        fenceng: '石鼓',
        leixing: 'KHDM-343',
        name:'10',
        state: '启用',
        lg:'198 . 207 . 107 . 10',
    },
    {
        id: 'GSJK06',
        jishu: '98',
        fenceng: '道滘',
        leixing: 'KHDM-342',
        name:'16',
        state: '启用',
        lg:'198 . 207 . 107 . 03',
    },
    {
        id: 'GSJK07',
        jishu: '88',
        fenceng: '望牛墩',
        leixing: 'KHDM-258',
        name:'14',
        state: '启用',
        lg:'198 . 207 . 107 . 05',
    },
    {
        id: 'GSJK08',
        jishu: '24',
        fenceng: '麻涌',
        leixing: 'KHDM-247',
        name:'15',
        state: '启用',
        lg:'198 . 207 . 107 . 03',
    },
    {
        id: 'GSJK01',
        jishu: '85',
        fenceng: '太平',
        leixing: 'KHDM-210',
        name:'20',
        state: '启用',
        lg:'198 . 207 . 107 . 07',
    },
    {
        id: 'GSJK02',
        jishu: '99',
        fenceng: '五点梅',
        leixing: 'KHDM-289',
        name:'22',
        state: '启用',
        lg:'198 . 207 . 107 . 08',
    },
    {
        id: 'GSJK03',
        jishu: '100',
        fenceng: '新联',
        leixing: 'KHDM-154',
        name:'16',
        state: '启用',
        lg:'198 . 207 . 107 . 01',
    },
    {
        id: 'GSJK04',
        jishu: '100',
        fenceng: '厚街',
        leixing: 'KHDM-315',
        name:'15',
        state: '启用',
        lg:'198 . 207 . 107 . 06',
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
            title: '高速监控点IP',
            dataIndex: 'lg',
            render: (text) => <Tag color="RED">{text}</Tag>,

        },
        
        {
            title: '高速路名称',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '高速路代码',
            dataIndex: 'leixing',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '监控存储进度',
            dataIndex: 'jishu',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '监控存储占用率',
            dataIndex: 'name',
            render: (text) => <Progress percent={text} status="active" />,
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
                title="监控管理"
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
