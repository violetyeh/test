import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Checkbox } from "antd";
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
        id: 'GSSF035',
        fl:'524辆',
        mc:'233辆',
        ma:'200辆',
        nl:'#3高速收费站',
    },
    {
        id: 'GSSF064',
        fl:'496辆',
        mc:'205辆',
        ma:'154辆',
        nl:'#2高速收费站',
    },
    {
        id: 'GSSF078',
        fl:'327辆',
        mc:'168辆',
        ma:'132辆',
        nl:'#2高速收费站',
    },
    {
        id: 'GSSF021',
        fl:'412辆',
        mc:'125辆',
        ma:'88辆',
        nl:'#1高速收费站',
    },
    {
        id: 'GSSF035',
        fl:'521辆',
        mc:'142辆',
        ma:'101辆',
        nl:'#2高速收费站',
    },
    {
        id: 'GSSF038',
        fl:'352辆',
        mc:'236辆',
        ma:'198辆',
        nl:'#3高速收费站',
    },
    {
        id: 'GSSF021',
        fl:'451辆',
        mc:'254辆',
        ma:'154辆',
        nl:'#2高速收费站',
    },
    {
        id: 'GSSF037',
        fl:'365辆',
        mc:'156辆',
        ma:'98辆',
        nl:'#1高速收费站',
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
            title: '收费站名称',
            dataIndex: 'nl',
        },
        
        
        {
            title: '车道小时交通量',
            dataIndex: 'mc',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '收费站出入口日交通量',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '全线各站交通量',
            dataIndex: 'fl',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },

        {
            title: '交通流量状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="多" unCheckedChildren="少"  defaultChecked/>,
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
                title="交通流量"
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
