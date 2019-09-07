import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag } from "antd";
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
        id: 'JL0001',
        tongdao:'张媛',
        touguang:'交通法律法规',
        xq:'2358745684@qq.com',
        duizhao:'客运公司部门',
        zt:'刘思思',
    },
    {
        id: 'JL0002',
        tongdao:'陈涛',
        touguang:'车辆使用制度',
        xq:'365471547@qq.com',
        duizhao:'客车客运公司部门',
        zt:'赵舒',
    },
    {
        id: 'JL0003',
        tongdao:'孟明',
        touguang:'安全行为辨识',
        xq:'626854789@qq.com',
        duizhao:'客运公司部门',
        zt:'高明一',
    },
    {
        id: 'JL0004',
        tongdao:'赵燕',
        touguang:'交通法律法规',
        xq:'36457895@qq.com',
        duizhao:'火车客运公司部门',
        zt:'刘思思',
    },
    {
        id: 'JL0005',
        tongdao:'钱前',
        touguang:'车辆使用制度',
        xq:'15647895@qq.com',
        duizhao:'客运公司部门',
        zt:'李顺德',
    },
    {
        id: 'JL0006',
        tongdao:'胡艳',
        touguang:'交通法律法规',
        xq:'13654789@qq.com.',
        duizhao:'客运公司部门',
        zt:'高明一',
    },
    {
        id: 'JL0007',
        tongdao:'罗蒙',
        touguang:'应急救援措施',
        xq:'23568745@qq.com ',
        duizhao:'高铁客运公司部门',
        zt:'高明一',
    },
    {
        id: 'JL0008',
        tongdao:'姜丝',
        touguang:'交通法律法规',
        xq:'37258965@qq.com ',
        duizhao:'客运公司部门',
        zt:'高明一',
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
            title: '记录编号',
            dataIndex: 'id',
        },
        
        {
            title: '教育内容',
            dataIndex: 'touguang',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
       
        {
            title: '培训地点',
            dataIndex: 'duizhao',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '培训老师',
            dataIndex: 'zt',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '受教育司机姓名',
            dataIndex: 'tongdao',
        },
        {
            title: '司机联系方式',
            dataIndex: 'xq',
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
                title="安全教育培训记录"
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
