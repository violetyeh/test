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
        id: 'FANG0021',
        mc:'文件查阅',
        gg:'未办理验收竣工的工程',
        hz:'整改后同意',
        jd:98,
        state: 1,
     },
     {
         id: 'FANG0022',
         mc:'文件编辑',
         gg:'半年度新增受监理工程',
         hz:'不同意',
         jd:100,
         state: 1,
      },
      {
         id: 'FANG0023',
         mc:'文件审核',
         gg:'半年度新增受监理工程',
         hz:'整改后同意',
         jd:56,
         state: 1,
      },
    
     {
        id: 'FANG0024',
        mc:'项目审核',
        gg:'受监理',
        hz:'整改后同意',
        jd:74,
        state: 1,
     },
     {
        id: 'FANG0025',
        mc:'项目查阅',
        gg:'半年度新增受监理工程',
        hz:'不同意',
        jd:95,
        state: 1,
     },
     {
        id: 'FANG0026',
        mc:'项目编辑',
        gg:'未办理施工图文件审查的工程',
        hz:'一次同意',
        jd:76,
        state: 1,
     },
     
     {
        id: 'FANG0027',
        mc:'监督编辑',
        gg:'未办理施工图文件审查的工程',
        hz:'整改后同意',
        jd:100,
        state: 1,
     },
     {
        id: 'FANG0028',
        mc:'监督审核',
        gg:'未办理验收竣工的工程',
        hz:'一次同意',
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
            title: '功能组名',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '工况状态',
            dataIndex: 'gg',
        },
        {
            title: '备案审批情况',
            dataIndex: 'hz',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '工程进度',
            dataIndex: 'jd',
            render: (text) => <Progress percent={text} status="active" />,
        },
        {
            title: '自动监理',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="自动" unCheckedChildren="手动" />,
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
                title="监理状况管理"
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
