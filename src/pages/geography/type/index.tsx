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
        id: 'LOCALHOST1',
        mc:'192.168.1.02',
        gg:'normal',
        hz:'是',
        jd:98,
        state: 1,
     },
     {
         id: 'LOCALHOST2',
         mc:'192.168.1.63',
         gg:'default',
         hz:'是',
         jd:100,
         state: 1,
      },
      {
         id: 'LOCALHOST3',
         mc:'192.168.1.71',
         gg:'default',
         hz:' 否',
         jd:56,
         state: 1,
      },
      {
         id: 'LOCALHOST4',
         mc:'192.168.1.1',
         gg:'normal',
         hz:'是',
         jd:74,
         state: 1,
      },
      {
         id: 'LOCALHOST5',
         mc:'192.168.1.03',
         gg:'default',
         hz:'是',
         jd:95,
         state: 1,
      },
     
    {
        id: 'LOCALHOST6',
        mc:'192.168.1.12',
        gg:'normal',
        hz:'否',
        jd:76,
        state: 1,
     },
     {
        id: 'LOCALHOST7',
        mc:'192.168.1.20',
        gg:'default',
        hz:'是',
        jd:100,
        state: 1,
     },
     {
        id: 'LOCALHOST8',
        mc:'192.168.1.15',
        gg:'normal',
        hz:'否',
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
            title: '机器名称',
            dataIndex: 'id',
        },
        {
            title: 'IP地址',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '机器策略',
            dataIndex: 'gg',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '是否使用私有策略',
            dataIndex: 'hz',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '审计进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '受控状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="受控正常" unCheckedChildren="受控异常" />,
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
                title="机器属性管理"
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
