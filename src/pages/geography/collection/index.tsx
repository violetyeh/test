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
        id: 'RQ0004',
        xm:'容器test001',
        jg:'breaking/kubernetes-dashboard-amd64',
        dw:'用户公开',
        pd:'2019年7月14日',
        state: '启用',
    },
    {
        id: 'RQ0005',
        xm:'容器test002',
        jg:'qcloud/ubuntu',
        dw:'用户公开',
        pd:'2019年6月14日',
        state: '启用',
    },
    {
        id: 'RQ0006',
        xm:'容器test003',
        jg:'qcloud/nginx',
        dw:'用户私有',
        pd:'2019年7月12日',
        state: '启用',
    },
    {
        id: 'RQ0007',
        xm:'容器test004',
        jg:'qcloud/centos',
        dw:'用户私有',
        pd:'2019年7月06日',
        state: '启用',
    },
    {
        id: 'RQ0008',
        xm:'容器test005',
        jg:'tkeimages/coredns',
        dw:'用户公开',
        pd:'2019年7月04日',
        state: '启用',
    },
    {
        id: 'RQ0001',
        xm:'容器test006',
        jg:'hunter/ronald',
        dw:'用户私有',
        pd:'2019年7月09日',
        state: '启用',
    },
    {
        id: 'RQ0002',
        xm:'容器test007',
        jg:'wind/centos-kafka',
        dw:'用户公开',
        pd:'2019年7月10日',
        state: '启用',
    },
    {
        id: 'RQ0003',
        xm:'容器test008',
        jg:'klei-tools/addon-resizer',
        dw:'用户公开',
        pd:'2019年7月07日',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '容器名称',
            dataIndex: 'xm',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '容器镜像',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '类型',
            dataIndex: 'dw',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '容器创建日期',
            dataIndex: 'pd',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
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
                title="容器配置管理"
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
