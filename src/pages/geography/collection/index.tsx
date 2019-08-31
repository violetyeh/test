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
        fl:'大桥区公路局',
        mc:'大桥线（s361）南开至西边段改造工程',
        ma:'大桥线管理局',
        nl:'刘文',
        status:'未施工',
    },
    {
        id: '02',
        fl:'施工单位甲',
        mc:'南滨线（s361）大平至西边段改造工程',
        ma:'南滨线管理局',
        nl:'赵媛',
        status:'施工中',
    },
    {
        id: '03',
        fl:'梦海区公路局',
        mc:'梦海线（s361）梦园至南边段改造工程',
        ma:'梦海线管理局',
        nl:'刘冰',
        status:'施工中',
    },
    {
        id: '04',
        fl:'忘曲区公路局',
        mc:'忘曲线（s361）古谭至西边段改造工程',
        ma:'忘曲线管理局',
        nl:'汪峰',
        status:'未施工',
    },
    {
        id: '05',
        fl:'三水区公路局',
        mc:'三水线（s361）乐水至南边段改造工程',
        ma:'三水线管理局',
        nl:'陈云',
        status:'施工中',
    },
    {
        id: '06',
        fl:'顺德区公路局',
        mc:'南滨线（s361）大平至西边段改造工程',
        ma:'南滨线管理局',
        nl:'王安',
        status:'施工中',
    },
    {
        id: '07',
        fl:'南海区公路局',
        mc:'盐南线（s361）乐平至南边段改造工程',
        ma:'盐南线管理局',
        nl:'张文芳',
        status:'未施工',
    },
    {
        id: '08',
        fl:'高明区公路局',
        mc:'盐南线（s361）乐平至南边段改造工程',
        ma:'盐南线管理局',
        nl:'王芳',
        status:'施工中',
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
            title: '施工单位',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '项目名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '管理处',
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
                title="施工单位信息"
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
