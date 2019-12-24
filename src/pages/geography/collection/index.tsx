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
        touguang:'眼前节OCT',
        xq:'150',
        duizhao:'自动检查',
        zt:'200（带闪光）',
    },
    {
        id: 'JL02107',
        tongdao:'罗蒙',
        touguang:'青光眼检查',
        xq:'220 ',
        duizhao:'人工检查',
        zt:'200',
    },
    {
        id: 'JL02108',
        tongdao:'姜丝',
        touguang:'眼前节OCT',
        xq:'200 ',
        duizhao:'自动检查',
        zt:'250',
    },
    {
        id: 'JL02101',
        tongdao:'张媛',
        touguang:'眼B超+影像工作站',
        xq:'300（带闪光）',
        duizhao:'人工检查',
        zt:'300',
    },
    {
        id: 'JL02102',
        tongdao:'陈涛',
        touguang:'青光眼检查',
        xq:'150（带闪光）',
        duizhao:'自动检查',
        zt:'100',
    },
    {
        id: 'JL02103',
        tongdao:'孟明',
        touguang:'眼底照相',
        xq:'200',
        duizhao:'人工检查',
        zt:'200',
    },
    {
        id: 'JL02104',
        tongdao:'赵燕',
        touguang:'眼底立体像',
        xq:'300',
        duizhao:'自动检查',
        zt:'350',
    },
    {
        id: 'JL02105',
        tongdao:'钱前',
        touguang:'彩色眼底照相',
        xq:'250',
        duizhao:'人工检查',
        zt:'200（带闪光）',
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
            title: '姓名',
            dataIndex: 'tongdao',
        },
        {
            title: '检查室',
            dataIndex: 'touguang',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
       
        {
            title: '一致性检查',
            dataIndex: 'duizhao',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '左眼度数',
            dataIndex: 'zt',
        },
       
        {
            title: '右眼度数',
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
                title="影像送检统计"
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
