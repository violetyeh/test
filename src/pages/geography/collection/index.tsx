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
        id: 'ZW12WL021',
        fl:'http://www.zhengwei.com',
        mc:'政委任命信息',
        ma:'政府',
        nl:'张文芳',
        status:'78',
    },
    {
        id: 'ZW12WL035',
        fl:'http://www.jishengban.com',
        mc:'计生办信息传',
        ma:'计生办',
        nl:'王芳',
        status:'56',
    },
    {
        id: 'ZW12WL038',
        fl:'http://www.zhengwu.com',
        mc:'二胎政策',
        ma:'计生办',
        nl:'刘文',
        status:'27',
    },
    {
        id: 'ZW12WL021',
        fl:'http://www.gongan.com',
        mc:'公安网上查询',
        ma:'公安局',
        nl:'赵媛',
        status:'100',
    },
    {
        id: 'ZW12WL037',
        fl:'http://www.shizheng.com',
        mc:'市政局终端信息',
        ma:'市政局',
        nl:'刘冰',
        status:'71',
    },
    {
        id: 'ZW12WL035',
        fl:'http://www.tudiju.com',
        mc:'土地局征地信息',
        ma:'土地局',
        nl:'汪峰',
        status:'99',
    },
    {
        id: 'ZW12WL064',
        fl:'http://www.cunwei.com',
        mc:'村委会议信息',
        ma:'村委会',
        nl:'陈云',
        status:'39',
    },
    {
        id: 'ZW12WL078',
        fl:'http://www.zhengfu.com',
        mc:'政府计生办信息',
        ma:'计生办',
        nl:'王安',
        status:'100',
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
            title: '运维政务信息',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '部门',
            dataIndex: 'ma',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '政务运维网址',
            dataIndex: 'fl',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        
       
       
        {
            title: '政务网络管理员',
            dataIndex: 'nl',
        },
        
        {
            title: '是否禁止',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >禁止</Checkbox>
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
                title="政务网络信息"
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
