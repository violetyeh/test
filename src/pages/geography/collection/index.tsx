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
        id: 'GC21',
        fl:'道路建筑工程',
        mc:'甘肃监理公司',
        ma:'质量监理',
        nl:'赵媛',
    },
    {
        id: 'GC37',
        fl:'大桥建筑工程',
        mc:'云南监理公司',
        ma:'进度监理',
        nl:'刘冰',
    },
    {
        id: 'GC35',
        fl:'医院建筑工程',
        mc:'北京监理公司',
        ma:'安全监理',
        nl:'汪峰',
    },
    {
        id: 'GC64',
        fl:'园区建筑工程',
        mc:'广州监理公司',
        ma:'质量监理',
        nl:'陈云',
    },
    {
        id: 'GC78',
        fl:'工业建筑工程',
        mc:'深圳监理公司',
        ma:'进度监理',
        nl:'王安',
    },

    {
        id: 'GC38',
        fl:'学校建筑工程',
        mc:'成都监理公司',
        ma:'安全监理',
        nl:'刘文',
    },
   
    {
        id: 'GC21',
        fl:'商业建筑工程',
        mc:'重庆监理公司',
        ma:'质量监理',
        nl:'张文芳',
    },
    {
        id: 'GC35',
        fl:'隧道建筑工程',
        mc:'上海监理公司',
        ma:'安全监理',
        nl:'王芳',
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
            title: '工程名称',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '监理单位',
            dataIndex: 'mc',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '监理类型',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '监理人员',
            dataIndex: 'nl',
        },
        {
            title: '状态',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >监理中</Checkbox>
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
                title="工程信息"
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
