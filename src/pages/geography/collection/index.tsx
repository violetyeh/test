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
        id: 'GC-GL-0038',
        fl:'成都公路隧道中心工程',
        mc:'成都检测公司',
        ma:'隧道剖面检测',
        nl:'刘文',
    },
    {
        id: 'GC-GL-0021',
        fl:'甘肃公路隧道中心工程',
        mc:'甘肃检测公司',
        ma:'基桩检测',
        nl:'赵媛',
    },
    {
        id: 'GC-GL-0037',
        fl:'云南公路隧道中心工程',
        mc:'云南检测公司',
        ma:'隧道剖面检测',
        nl:'刘冰',
    },
    {
        id: 'GC-GL-0035',
        fl:'北京公路隧道中心工程',
        mc:'北京检测公司',
        ma:'浇筑材料检测',
        nl:'汪峰',
    },
    {
        id: 'GC-GL-0064',
        fl:'广州公路隧道中心工程',
        mc:'广州检测公司',
        ma:'基桩检测',
        nl:'陈云',
    },
    {
        id: 'GC-GL-0078',
        fl:'深圳公路隧道中心工程',
        mc:'深圳检测公司',
        ma:'浇筑材料检测',
        nl:'王安',
    },
    {
        id: 'GC-GL-0021',
        fl:'重庆公路隧道中心工程',
        mc:'重庆检测公司',
        ma:'隧道剖面检测',
        nl:'张文芳',
    },
    {
        id: 'GC-GL-0035',
        fl:'上海公路隧道中心工程',
        mc:'上海检测公司',
        ma:'基桩检测',
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
            title: '检测单位',
            dataIndex: 'mc',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '检测类型',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '检测人员',
            dataIndex: 'nl',
        },
        {
            title: '状态',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >检测中</Checkbox>
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
