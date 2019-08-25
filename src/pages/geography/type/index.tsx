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
        id: 'FANG0024',
        mc:'ANQUAN',
        gg:'1',
        hz:'高级管理',
        jd:74,
        state: 1,
     },
     {
        id: 'FANG0025',
        mc:'HUOQ',
        gg:'5',
        hz:'高级管理',
        jd:95,
        state: 1,
     },
     {
        id: 'FANG0026',
        mc:'ANQUAN',
        gg:'4',
        hz:'安全审计',
        jd:76,
        state: 1,
     },
     {
        id: 'FANG0021',
        mc:'HUOQ',
        gg:'3',
        hz:'安全审计',
        jd:98,
        state: 1,
     },
     {
         id: 'FANG0022',
         mc:'FANG',
         gg:'6',
         hz:'高级管理',
         jd:100,
         state: 1,
      },
      {
         id: 'FANG0023',
         mc:'TOPSEA',
         gg:'5',
         hz:'安全审计',
         jd:56,
         state: 1,
      },
     {
        id: 'FANG0027',
        mc:'TOPSEA',
        gg:'4',
        hz:'高级管理',
        jd:100,
        state: 1,
     },
     {
        id: 'FANG0028',
        mc:'TOPSEA',
        gg:'1',
        hz:'安全审计',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '防火墙名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '防火墙调试级别',
            dataIndex: 'gg',
        },
        {
            title: '权限',
            dataIndex: 'hz',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '安全检测进度',
            dataIndex: 'jd',
            render: (text) => <Progress percent={text} status="active" />,
        },
        {
            title: '访问权限',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="允许访问" unCheckedChildren="不允许" />,
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
                title="安全检测管理"
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
