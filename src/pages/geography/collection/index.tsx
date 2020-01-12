import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag } from "antd";
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
        id: 'TQCA02141',
        xm:'原料',
        jg:'提取物 ',
        dw:'GXH200',
        dp:'2020年01月07日',
        pd:'2020年01月10日',
        state: '启用',
        name:'关笑笑',
    },
    {
        id: 'TQCA02142',
        xm:'粉碎、过筛、混合',
        jg:'辅料',
        dw:'GXH300',
        dp:'2020年01月03日',
        pd:'2020年01月10日',
        state: '启用',
        name:'赵云',
    },
    {
        id: 'TQCA02143',
        xm:'制软材 ',
        jg:'微晶纤维素',
        dw:'GXH120',
        dp:'2020年01月03日',
        pd:'2020年01月07日',
        state: '启用',
        name:'王梦洁',
    },
    {
        id: 'TQCA02144',
        xm:'湿法制粒',
        jg:'加水或者水、乙醇的混合物',
        dw:'GXH300',
        dp:'2020年01月13日',
        pd:'2020年01月14日',
        state: '启用',
        name:'余天',
    },
    {
        id: 'TQCA02145',
        xm:'烘干',
        jg:'50℃~60℃沸腾干燥机干燥',
        dw:'GXH210',
        dp:'2020年01月13日',
        pd:'2020年01月14日',
        state: '启用',
        name:'赵子涵',
    },
    {
        id: 'TQCA02146',
        xm:'总混 ',
        jg:'V型混合机',
        dw:'GXH150',
        dp:'2020年01月03日',
        pd:'2020年01月12日',
        state: '启用',
        name:'陈梓童',
    },
    {
        id: 'TQCA02147',
        xm:'过筛',
        jg:'硬脂酸镁',
        dw:'GXH180',
        dp:'2020年01月05日',
        pd:'2020年01月06日',
        state: '启用',
        name:'姜宇',
    },
    {
        id: 'TQCA02148',
        xm:'包装',
        jg:'数片机',
        dw:'GXH260',
        dp:'2020年01月08日',
        pd:'2020年01月11日',
        state: '启用',
        name:'张峰',
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
            title: '操作人',
            dataIndex: 'name',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '操作时间',
            dataIndex: 'dp',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '工序',
            dataIndex: 'xm',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '详细信息',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '工序号',
            dataIndex: 'dw',
            render: (text) => <Tag color="blue">{text}</Tag>,
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
                title="提取操作"
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
