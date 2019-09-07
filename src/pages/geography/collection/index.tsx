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
        id: 'JL02106',
        tongdao:'胡艳',
        touguang:'吴教练',
        xq:'2365',
        duizhao:'阶段1',
        zt:'96',
    },
    {
        id: 'JL02107',
        tongdao:'罗蒙',
        touguang:'李教练',
        xq:'2356 ',
        duizhao:'阶段2',
        zt:'96',
    },
    {
        id: 'JL02108',
        tongdao:'姜丝',
        touguang:'吴教练',
        xq:'3725 ',
        duizhao:'阶段1',
        zt:'96',
    },
    {
        id: 'JL02101',
        tongdao:'张媛',
        touguang:'张教练',
        xq:'2358',
        duizhao:'阶段2',
        zt:'60',
    },
    {
        id: 'JL02102',
        tongdao:'陈涛',
        touguang:'吴教练',
        xq:'3654',
        duizhao:'阶段1',
        zt:'90',
    },
    {
        id: 'JL02103',
        tongdao:'孟明',
        touguang:'吴教练',
        xq:'62685',
        duizhao:'阶段2',
        zt:'96',
    },
    {
        id: 'JL02104',
        tongdao:'赵燕',
        touguang:'李教练',
        xq:'3645',
        duizhao:'阶段1',
        zt:'86',
    },
    {
        id: 'JL02105',
        tongdao:'钱前',
        touguang:'吴教练',
        xq:'2564',
        duizhao:'阶段3',
        zt:'90',
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '学员姓名',
            dataIndex: 'tongdao',
        },
        {
            title: '教练姓名',
            dataIndex: 'touguang',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
       
        {
            title: '培训阶段',
            dataIndex: 'duizhao',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '总学时',
            dataIndex: 'zt',
        },
       
        {
            title: '总里程',
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
                title="培训计时计程管理"
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
