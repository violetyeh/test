import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag, Checkbox } from "antd";
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
        id: 'ZW-YW-WL-001',
        mc:'通信终端中断次数',
        gg:'不使用任何规则',
        hz:'服务器',
        jd:98,
     },
     {
         id: 'ZW-YW-WL-002',
         mc:'终端通信中断最大时间',
         gg:'网络安全规则',
         hz:'服务器',
         jd:100,
      },
      {
         id: 'ZW-YW-WL-003',
         mc:'终端通信中断最小时间',
         gg:'网络安全规则',
         hz:' 路由器',
         jd:56,
      },
      {
         id: 'ZW-YW-WL-004',
         mc:'参数异常',
         gg:'不使用任何规则',
         hz:'路由器',
         jd:74,
      },
      {
         id: 'ZW-YW-WL-005',
         mc:'定值异常',
         gg:'网络安全规则',
         hz:'服务器',
         jd:95,
      },
    {
        id: 'ZW-YW-WL-006',
        mc:'终端通信通道延迟最大时间',
        gg:'不使用任何规则',
        hz:'路由器',
        jd:76,
     },
     {
        id: 'ZW-YW-WL-007',
        mc:'终端通信通道延迟最小时间',
        gg:'网络安全规则',
        hz:'服务器',
        jd:100,
     },
     {
        id: 'ZW-YW-WL-008',
        mc:'终端在线率',
        gg:'不使用任何规则',
        hz:'路由器',
        jd:88,
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
            title: '运维项目',
            dataIndex: 'mc',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
         {
            title: '节点类型',
            dataIndex: 'hz',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '运维规则',
            dataIndex: 'gg',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
       
        {
            title: '运维进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '运维状态',
            dataIndex: 'jk',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >正在运维</Checkbox>
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
        const { saveVisible, data, currentItem } = this.state;
        return (
            <PageHeaderWrapper
                title="运维管理"
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
