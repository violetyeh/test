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
        id: 'ZD20038',
        fl:'198.102.1.02',
        mc:'Windows 2007',
        ma:'512（M）',
        nl:'目标www.wwe',
        status:'27',
    },
    {
        id: 'ZD20021',
        fl:'198.102.1.101',
        mc:'Windows 2008',
        ma:'128（M）',
        nl:'目标www.bdsd',
        status:'100',
    },
    {
        id: 'ZD20037',
        fl:'198.102.1.104',
        mc:'Windows XP',
        ma:'2040（M）',
        nl:'目标www.asda',
        status:'71',
    },
    {
        id: 'ZD20035',
        fl:'198.102.1.188',
        mc:'Windows 2007',
        ma:'447（M）',
        nl:'目标www.awewa',
        status:'99',
    },
    {
        id: 'ZD20064',
        fl:'198.102.1.203',
        mc:'Windows 2008',
        ma:'68（M）',
        nl:'目标www.sweer',
        status:'39',
    },
    {
        id: 'ZD20078',
        fl:'198.102.1.102',
        mc:'Windows 2007',
        ma:'128（M）',
        nl:'目标www.sadf',
        status:'100',
    },
    {
        id: 'ZD20021',
        fl:'198.102.1.02',
        mc:'Windows 2008',
        ma:'68（M）',
        nl:'目标www.jsds',
        status:'78',
    },
    {
        id: 'ZD20035',
        fl:'198.102.1.136',
        mc:'Windows XP',
        ma:'128（M）',
        nl:'目标www.jonh100',
        status:'56',
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
            title: 'IP地址',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '系统类型',
            dataIndex: 'mc',
        },
        {
            title: '内存',
            dataIndex: 'ma',
        },
       
        {
            title: '攻击状态',
            dataIndex: 'nl',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '内存空间',
            dataIndex: 'status',
            render: (text) => <Progress percent={text} status="active" />,
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
                title="主机管理"
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
