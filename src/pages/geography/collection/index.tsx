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
        mc:'私人',
        ma:'身份证',
        nl:'方文',
    },
    {
        id: 'AQGZE-00064',
        fl:'0.31',
        mc:'私人',
        ma:'身份证',
        nl:'陈乐',
    },
    {
        id: 'AQGZE-00078',
        fl:'24.29',
        mc:'企业',
        ma:'组织机构代码',
        nl:'外贸服装公司',
    },
    {
        id: 'AQGZE-00021',
        fl:'0.12',
        mc:'私人',
        ma:'身份证',
        nl:'刘芳',
    },
    {
        id: 'AQGZE-00035',
        fl:'0.24',
        mc:'企业',
        ma:'组织机构代码',
        nl:'电子科技有限公司',
    },
    {
        id: 'AQGZE-00038',
        fl:'29.35',
        mc:'企业',
        ma:'组织机构代码',
        nl:'丰信华实有限公司',
    },
    {
        id: 'AQGZE-00021',
        fl:'31.25',
        mc:'私人',
        ma:'身份证',
        nl:'王迅',
    },
    {
        id: 'AQGZE-00037',
        fl:'23.21',
        mc:'企业',
        ma:'组织机构代码',
        nl:'风华华业实业有限公司',
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
            title: '权利人名称',
            dataIndex: 'nl',
        },
        
        
        {
            title: '权利人类型',
            dataIndex: 'mc',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '证件种类',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '录入进度',
            dataIndex: 'fl',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },

        {
            title: '调查状态',
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
                title="权利人信息"
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
