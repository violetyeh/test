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
        id: 'SX-DB-ID-0001',
        tongdao:'张媛',
        touguang:'粮食收购许可申请',
        xq:'2358745684@qq.com',
        duizhao:'政府办公室',
        zt:'未办结',
    },
    {
        id: 'SX-DB-ID-0002',
        tongdao:'陈涛',
        touguang:'烟花爆竹经营许可申请',
        xq:'365471547@qq.com',
        duizhao:'工商局',
        zt:'已办结',
    },
    {
        id: 'SX-DB-ID-0003',
        tongdao:'孟明',
        touguang:'老年优待证申请',
        xq:'626854789@qq.com',
        duizhao:'工商局',
        zt:'未受理',
    },
    {
        id: 'SX-DB-ID-0004',
        tongdao:'赵燕',
        touguang:'会计资格从业证书核发申请',
        xq:'36457895@qq.com',
        duizhao:'政府办公室',
        zt:'待补正',
    },
    {
        id: 'SX-DB-ID-0005',
        tongdao:'钱前',
        touguang:'政府投资项目审批申请',
        xq:'15647895@qq.com',
        duizhao:'工商局',
        zt:'已受理',
    },
    {
        id: 'SX-DB-ID-0006',
        tongdao:'胡艳',
        touguang:'经济规范政策',
        xq:'13654789@qq.com.',
        duizhao:'政府办公室',
        zt:'未受理',
    },
    {
        id: 'SX-DB-ID-0007',
        tongdao:'罗蒙',
        touguang:'节假日规定申请',
        xq:'23568745@qq.com ',
        duizhao:'工商局',
        zt:'未受理',
    },
    {
        id: 'SX-DB-ID-0008',
        tongdao:'姜丝',
        touguang:'社区活动开展资格申请',
        xq:'37258965@qq.com ',
        duizhao:'政府办公室',
        zt:'未受理',
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
            title: '办件编号',
            dataIndex: 'id',
        },
        
        {
            title: '事项名称',
            dataIndex: 'touguang',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
       
        {
            title: '受理部门',
            dataIndex: 'duizhao',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '受理状态',
            dataIndex: 'zt',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '管理员',
            dataIndex: 'tongdao',
        },
        {
            title: 'E-mail',
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
                title="行政许可事项"
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
