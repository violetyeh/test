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
        id: 'AQGZE-00035',
        fl:'26.38',
        mc:'坡度1',
        ma:'21456.36',
        nl:'0.00-37.59',
    },
    {
        id: 'AQGZE-00064',
        fl:'0.31',
        mc:'坡度2',
        ma:'2521.25',
        nl:'37.59-75.18',
    },
    {
        id: 'AQGZE-00078',
        fl:'24.29',
        mc:'坡度3',
        ma:'32541.28',
        nl:'75.18-112.76',
    },
    {
        id: 'AQGZE-00021',
        fl:'0.12',
        mc:'坡度4',
        ma:'1254.21',
        nl:'112.76-150.35',
    },
    {
        id: 'AQGZE-00035',
        fl:'0.24',
        mc:'坡度5',
        ma:'2563.21',
        nl:'150.35-187.79',
    },
    {
        id: 'AQGZE-00038',
        fl:'29.35',
        mc:'坡度6',
        ma:'15642.36',
        nl:'187.79-225.53',
    },
    {
        id: 'AQGZE-00021',
        fl:'31.25',
        mc:'坡度7',
        ma:'63254.12',
        nl:'225.53-263.11',
    },
    {
        id: 'AQGZE-00037',
        fl:'23.21',
        mc:'坡度8',
        ma:'7737.23',
        nl:'263.11-300.70',
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
            title: '坡度区间%',
            dataIndex: 'nl',
        },
        
        
        {
            title: '层名',
            dataIndex: 'mc',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '平面面积',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '占总面积比（%）',
            dataIndex: 'fl',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },

        {
            title: '检测状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="完成" unCheckedChildren="未完成" />,
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
                title="地形分析"
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
