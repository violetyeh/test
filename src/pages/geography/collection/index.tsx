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
        id: 'JKSP-0211',
        jishu: '100',
        fenceng: '20天',
        leixing: '210M',
        name:'22',
        state: '启用',
        lg:'监控区域-茶水间',
    },
    {
        id: 'JKSP-0212',
        jishu: '85',
        fenceng: '10天',
        leixing: '289M',
        name:'13',
        state: '启用',
        lg:'监控区域-办公室',
    },
    {
        id: 'JKSP-0213',
        jishu: '100',
        fenceng: '10天',
        leixing: '154M',
        name:'16',
        state: '启用',
        lg:'监控区域-二楼楼梯',
    },
    {
        id: 'JKSP-0214',
        jishu: '100',
        fenceng: '15天',
        leixing: '315M',
        name:'15',
        state: '启用',
        lg:'监控区域-一楼电梯',
    },
    {
        id: 'JKSP-0215',
        jishu: '100',
        fenceng: '15天',
        leixing: '343M',
        name:'10',
        state: '启用',
        lg:'监控区域-会议室',
    },
    {
        id: 'JKSP-0216',
        jishu: '98',
        fenceng: '30天',
        leixing: '342M',
        name:'16',
        state: '启用',
        lg:'监控区域-东门',
    },
    {
        id: 'JKSP-0217',
        jishu: '88',
        fenceng: '5天',
        leixing: '258M',
        name:'14',
        state: '启用',
        lg:'监控区域-大门',
    },
    {
        id: 'JKSP-0218',
        jishu: '24',
        fenceng: '7天',
        leixing: '247M',
        name:'15',
        state: '启用',
        lg:'监控区域-走廊',
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
            title: '监控区域',
            dataIndex: 'lg',
            render: (text) => <Tag color="BLUE">{text}</Tag>,

        },
        
        {
            title: '自动删除设置',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '监控视频大小',
            dataIndex: 'leixing',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '存储占用率',
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
                title="监控视频管理"
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
