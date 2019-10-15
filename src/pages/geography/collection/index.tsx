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
        id: 'ST021',
        fl:'龙山隧道',
        mc:'18:00',
        ma:'6:00',
        nl:'100',
    },
    {
        id: 'ST035',
        fl:'云山隧道',
        mc:'17:30',
        ma:'6:00',
        nl:'89',
    },
    {
        id: 'ST038',
        fl:'六合隧道',
        mc:'17:30',
        ma:'6:30',
        nl:'90',
    },
    {
        id: 'ST021',
        fl:'青云隧道',
        mc:'18:00',
        ma:'7:00',
        nl:'99',
    },
    {
        id: 'ST037',
        fl:'井岗隧道',
        mc:'17:30',
        ma:'6:00',
        nl:'100',
    },
    {
        id: 'ST035',
        fl:'大堰隧道',
        mc:'18:30',
        ma:'6:00',
        nl:'97',
    },
    {
        id: 'ST064',
        fl:'流峰隧道',
        mc:'18:00',
        ma:'6:30',
        nl:'80',
    },
    {
        id: 'ST078',
        fl:'陕弯隧道',
        mc:'18:00',
        ma:'6:00',
        nl:'98',
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
            title: '隧道名称',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '开灯时间',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '关灯时间',
            dataIndex: 'ma',
        },
       
        {
            title: '开灯率',
            dataIndex: 'nl',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '自动控制',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >自动</Checkbox>
                </Fragment>
            ),
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
                title="照明控制"
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
