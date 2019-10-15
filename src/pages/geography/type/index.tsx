import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";

interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    data: any[];
    currentItem: any;
}

const mockData = [
    
     {
        id: 'CK00024',
        mc:'C0仓库01',
        gg:'到货通知单批量导入',
        hz:'商品物资',
        jd:74,
        state: 1,
     },
     {
        id: 'CK00025',
        mc:'C0仓库02',
        gg:'货位容量查询',
        hz:'工程物资',
        jd:95,
        state: 1,
     },
     {
        id: 'CK00026',
        mc:'C0仓库03',
        gg:'货位查询',
        hz:'办公物资',
        jd:76,
        state: 1,
     },
     {
        id: 'CK00021',
        mc:'C0仓库04',
        gg:'货物称重',
        hz:'修理物资',
        jd:98,
        state: 1,
     },
     {
         id: 'CK00022',
         mc:'C0仓库05',
         gg:'收货单录入',
         hz:'工程物资',
         jd:100,
         state: 1,
      },
      {
         id: 'CK00023',
         mc:'C0仓库06',
         gg:'收货查询',
         hz:' 办公物资',
         jd:56,
         state: 1,
      },
     {
        id: 'CK00027',
        mc:'C0仓库07',
        gg:'收货质检',
        hz:'工程物资',
        jd:100,
        state: 1,
     },
     {
        id: 'CK00028',
        mc:'C0仓库08',
        gg:'到货通知',
        hz:'办公物资',
        jd:88,
        state: 1,
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
            title: '存货仓库',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '仓储环节',
            dataIndex: 'gg',
        },
        {
            title: '物品类型',
            dataIndex: 'hz',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '仓储率',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '仓储情况',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="已存满" unCheckedChildren="未存满" />,
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
        const { saveVisible, data, currentItem } = this.state;
        return (
            <PageHeaderWrapper
                title="储物报表管理"
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
            </PageHeaderWrapper>
        );
    }
}

export default Type;
