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
       id: 'VG10651',
       zc:'Successful login user',
       zhonglei:'#023INFO0',
       mingcheng:'USER,LOGIN',
       songjian:'ROOT1',
       shengchan:'admin',
       process:50,
    },
    {
        id: 'VG10652',
        zc:'Delete relevant information',
        zhonglei:'#065INFO3',
        mingcheng:'USER,LOGIN',
        songjian:'ROOT1',
        shengchan:'violet',
        process:70,
     },
     {
        id: 'VG10653',
        zc:'Delete Virtual Machine Platform',
        zhonglei:'#079INFO1',
        mingcheng:'TEMPLATE,DELETE',
        songjian:'ROOT6',
        shengchan:'adminuser',
        process:90,
     },
     {
        id: 'VG10654',
        zc:'Delete relevant information ',
        zhonglei:'#003INFO2',
        mingcheng:'USER,UPDASTE',
        songjian:'ROOT6',
        shengchan:'test',
        process:99,
     },
     {
        id: 'VG10655',
        zc:'Add Virtual Machine to Platform',
        zhonglei:'#024INFO3',
        mingcheng:'TEMPLATE,DELETE',
        songjian:'ROOT2',
        shengchan:'admin',
        process:50,
     },
     {
        id: 'VG10656',
        zc:'Added Server Address',
        zhonglei:'#008INFO5',
        mingcheng:'USER,UPDASTE',
        songjian:'ROOT3',
        shengchan:'example',
        process:60,
     },
     {
        id: 'VG10657',
        zc:' Delete Virtual Machine Platform',
        zhonglei:'#001INFO0',
        mingcheng:'USER,LOGIN',
        songjian:'ROOT6',
        shengchan:'test',
        process:43,
     },
     {
        id: 'VG10658',
        zc:'Add Virtual Machine to Platform',
        zhonglei:'#008INFO3',
        mingcheng:'USER,UPDASTE',
        songjian:'ROOT3',
        shengchan:'admin',
        process:22,
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
            title: '说明',
            dataIndex: 'zc',
        },
        {
            title: '级别',
            dataIndex: 'zhonglei',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: 'TYPE',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '域',
            dataIndex: 'songjian',
        },
        {
            title: '账户',
            dataIndex: 'shengchan',
            render: (text) => <Tag color="Violet">{text}</Tag>,
        },
       
        {
            title: '管理效率',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
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
                title="事件管理"
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
