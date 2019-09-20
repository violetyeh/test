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
        mc:'孤植',
        gg:'落叶灌木',
        hz:'4',
        sg:'12',
        jd:74,
        state: 1,
     },
     {
        id: 'FANG0025',
        mc:'列植',
        gg:'花卉藤本',
        hz:'5',
        sg:'3',
        jd:95,
        state: 1,
     },
     {
        id: 'FANG0026',
        mc:'孤植',
        gg:'落叶乔木',
        hz:'4',
        sg:'12',
        jd:76,
        state: 1,
     },
     {
        id: 'FANG0021',
        mc:'片植',
        gg:'常绿灌木',
        hz:'3',
        sg:'15',
        jd:98,
        state: 1,
     },
     {
         id: 'FANG0022',
         mc:'孤植',
         gg:'常绿乔木',
         hz:'4',
         sg:'9',
         jd:100,
         state: 1,
      },
      {
         id: 'FANG0023',
         mc:'片植',
         gg:'常绿灌木',
         hz:'5',
         sg:'10',
         jd:56,
         state: 1,
      },
     {
        id: 'FANG0027',
        mc:'列植',
        gg:'落叶乔木',
        hz:'3',
        sg:'12',
        jd:100,
        state: 1,
     },
     {
        id: 'FANG0028',
        mc:'片植',
        gg:'常绿乔木',
        hz:'5',
        sg:'8',
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
            title: '种植方式',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '植物类型',
            dataIndex: 'gg',
        },
        {
            title: '冠幅（米）',
            dataIndex: 'hz',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '树高（米）',
            dataIndex: 'sg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '设计进度',
            dataIndex: 'jd',
            render: (text) => <Progress percent={text} status="active" />,
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
                title="种植设计"
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
