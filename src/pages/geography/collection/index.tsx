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
        id: 'A1',
        tongdao:'张媛',
        touguang:'大型客车',
        xq:'2358',
        duizhao:'A2、C1、C2、C3、C4、C5',
        zt:'60',
    },
    {
        id: 'A2',
        tongdao:'陈涛',
        touguang:'牵引车',
        xq:'3654',
        duizhao:'',
        zt:'90',
    },
    {
        id: 'A3',
        tongdao:'孟明',
        touguang:'城市公交车',
        xq:'62685',
        duizhao:'C1、C2、C3、C4、C5',
        zt:'96',
    },
    {
        id: 'B1',
        tongdao:'赵燕',
        touguang:'中型客车',
        xq:'3645',
        duizhao:'C1、C2、C3、C4、M',
        zt:'86',
    },
    {
        id: 'B2',
        tongdao:'钱前',
        touguang:'大型货车',
        xq:'2564',
        duizhao:'C1',
        zt:'90',
    },
    {
        id: 'C1',
        tongdao:'胡艳',
        touguang:'手动挡小型汽车',
        xq:'2365.',
        duizhao:'',
        zt:'96',
    },
    {
        id: 'C2',
        tongdao:'罗蒙',
        touguang:'小型自动挡汽车',
        xq:'2356 ',
        duizhao:'',
        zt:'96',
    },
    {
        id: 'C3',
        tongdao:'姜丝',
        touguang:'低速载货汽车',
        xq:'3725 ',
        duizhao:'C4',
        zt:'96',
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
            title: '车型代码',
            dataIndex: 'id',
        },
        
        {
            title: '车型名称',
            dataIndex: 'touguang',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
       
        {
            title: '准予驾驶其他准驾车型',
            dataIndex: 'duizhao',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '总学时',
            dataIndex: 'zt',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '教练',
            dataIndex: 'tongdao',
        },
        {
            title: '定价',
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
                title="准驾车型管理"
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
