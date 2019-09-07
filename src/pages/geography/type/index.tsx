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
        id: 'CWG0000024',
        mc:'快递',
        gg:'实名制取物',
        hz:'申通快递',
        jd:74,
        state: 1,
     },
     {
        id: 'CWG0000025',
        mc:'快递',
        gg:'实名制取物',
        hz:'邮政快递',
        jd:95,
        state: 1,
     },
     {
        id: 'CWG0000026',
        mc:'游乐场',
        gg:'未实名',
        hz:'自带物品',
        jd:76,
        state: 1,
     },
     {
        id: 'CWG0000021',
        mc:'商场',
        gg:'未实名',
        hz:'自带物品',
        jd:98,
        state: 1,
     },
     {
         id: 'CWG0000022',
         mc:'超市',
         gg:'未实名',
         hz:'自带物品',
         jd:100,
         state: 1,
      },
      {
         id: 'CWG0000023',
         mc:'快递',
         gg:'实名制取物',
         hz:' 中通快递',
         jd:56,
         state: 1,
      },
     {
        id: 'CWG0000027',
        mc:'快递',
        gg:'实名制取物',
        hz:'韵达快递',
        jd:100,
        state: 1,
     },
     {
        id: 'CWG0000028',
        mc:'快递',
        gg:'实名制取物',
        hz:'申通快递',
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
            title: '储物柜分类',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '控制类型',
            dataIndex: 'gg',
        },
        {
            title: '物品类型',
            dataIndex: 'hz',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '储物柜利用率',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '取件情况',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="已取件" unCheckedChildren="未取件" />,
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
                title="储物柜报表管理"
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
