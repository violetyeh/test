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
        id: 'APOI-0026',
        mc:'风格',
        gg:'绿地',
        hz:'城市轮廓线',
        jd:76,
        state: 1,
     },
     {
        id: 'APOI-0027',
        mc:'色彩',
        gg:'水体',
        hz:'标识以及无障碍系统',
        jd:100,
        state: 1,
     },
     {
        id: 'APOI-0028',
        mc:'建筑群体组合空间关系',
        gg:'商业',
        hz:'城市轮廓线',
        jd:88,
        state: 1,
     }, 
    {
       id: 'APOI-0021',
       mc:'风格',
       gg:'绿地',
       hz:'街道',
       jd:98,
       state: 1,
    },
    {
        id: 'APOI-0022',
        mc:'高度',
        gg:'城市广场',
        hz:'标志性建筑',
        jd:100,
        state: 1,
     },
     {
        id: 'APOI-0023',
        mc:'高度',
        gg:'办公',
        hz:'标志性建筑',
        jd:56,
        state: 1,
     },
     {
        id: 'APOI-0024',
        mc:'历史文化遗产保护提出控制',
        gg:'居住',
        hz:'夜间景观',
        jd:74,
        state: 1,
     },
     {
        id: 'APOI-0025',
        mc:'高度',
        gg:'城市广场',
        hz:'街道',
        jd:95,
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
            title: '功能空间',
            dataIndex: 'gg',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        
        {
            title: '环境要素',
            dataIndex: 'hz',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '建筑物属性',
            dataIndex: 'mc',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '编制进度',
            dataIndex: 'jd',
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
                title="编制管理"
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
