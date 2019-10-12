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
        id: '01',
        fl:'建管局',
        mc:'市人民医院迁建工程',
        ma:'14.21',
        nl:'刘文',
        status:'未监理',
    },
    {
        id: '02',
        fl:'公路局',
        mc:'大平至西边段改造工程',
        ma:'36.21',
        nl:'赵媛',
        status:'监理中',
    },
    {
        id: '03',
        fl:'梦海区',
        mc:'梦海线改造工程',
        ma:'2.35',
        nl:'刘冰',
        status:'监理中',
    },
    {
        id: '04',
        fl:'市区',
        mc:'病房楼装修工程',
        ma:'0.42',
        nl:'汪峰',
        status:'未监理',
    },
    {
        id: '05',
        fl:'生态园区',
        mc:'余家岸组团一标',
        ma:'5.36',
        nl:'陈云',
        status:'监理中',
    },
    {
        id: '06',
        fl:'顺德区',
        mc:'天地永和二标',
        ma:'10.23',
        nl:'王安',
        status:'监理中',
    },
    {
        id: '07',
        fl:'建管局',
        mc:'情缘龙山',
        ma:'30',
        nl:'张文芳',
        status:'未监理',
    },
    {
        id: '08',
        fl:'公路局',
        mc:'加油站',
        ma:'0.32',
        nl:'王芳',
        status:'监理中',
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
            title: '工程单位',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '项目名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '建筑面积（万平方米）',
            dataIndex: 'ma',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
       
        {
            title: '监理员',
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
                title="工程单位信息"
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
