import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Checkbox, Progress } from "antd";
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
        id: 'em38',
        fl:'网桥1',
        mc:'接内网',
        ma:'增强型',
        nl:'刘文',
        status:'异常',
    },
    {
        id: 'em21',
        fl:'监控模式',
        mc:'接外网',
        ma:'增强型',
        nl:'赵媛',
        status:'正常',
    },
    {
        id: 'em37',
        fl:'网桥1',
        mc:'接内网',
        ma:'BSD',
        nl:'刘冰',
        status:'正常',
    },
    {
        id: 'em35',
        fl:'网桥2',
        mc:'接内网',
        ma:'增强型',
        nl:'汪峰',
        status:'异常',
    },
    {
        id: 'em64',
        fl:'网桥1',
        mc:'接外网',
        ma:'BSD',
        nl:'陈云',
        status:'正常',
    },
    {
        id: 'em78',
        fl:'监控模式',
        mc:'接内网',
        ma:'增强型',
        nl:'王安',
        status:'正常',
    },
    {
        id: 'em21',
        fl:'网桥2',
        mc:'接外网',
        ma:'BSD',
        nl:'张文芳',
        status:'异常',
    },
    {
        id: 'em35',
        fl:'网桥1',
        mc:'接内网',
        ma:'增强型',
        nl:'王芳',
        status:'正常',
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
            title: '接口名称',
            dataIndex: 'id',
        },
        {
            title: '应用模式',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '接入位置',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '驱动类型',
            dataIndex: 'ma',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
       
        {
            title: '管理员',
            dataIndex: 'nl',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
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
                title="数据接口信息"
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
