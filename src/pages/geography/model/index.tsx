import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress, Radio } from "antd";
import Search from "./Search";
import Save from "./Save";
import styles from "../style.less";

interface ModelProps {

}

interface ModelState {
    saveVisible: boolean,
    data: any[],
    currentItem: any,
}

const mockData = [
    {
        lx: 'Oracle',
        mc:'192.168.0.219',
        ren:'刘威',
        riqi:'2019年7月12日',
        ml:'E:-备份-2019-08-18 项目图片',
        wz:'图片',
        process: 100,
        
    },
    {
        lx: 'Sybase',
        mc:'192.168.0.347',
        ren:'孟浩',
        riqi:'2019年7月02日',
        ml:'E:-备份-2019-08-18 项目表格信息',
        wz:'表格',
        process: 61,
        
    },
    {
        lx: 'Oracle',
        mc:'192.168.0.01',
        ren:'唐宇',
        riqi:'2019年7月13日',
        ml:'E:-备份-2019-08-18 项目会议录音',
        wz:'会议录音',
        process: 74,
        
    },
    {
        lx: 'Sybase',
        mc:'192.168.0.005',
        ren:'李白白',
        riqi:'2019年7月14日',
        ml:'E:-备份-2019-08-18 项目会议记录',
        wz:'会议记录',
        
    },
    {
        lx: 'Sybase',
        mc:'192.168.0.354',
        ren:'明楼',
        riqi:'2019年7月05日',
        ml:'E:-备份-2019-08-18 工作日志',
        wz:'工作日志',
        
    },
    {
        lx: 'Sybase',
        mc:'192.168.0.014',
        ren:'明玉',
        riqi:'2019年7月06日',
        ml:'E:-备份-2019-08-18 项目相关人员信息',
        wz:'相关人员信息 ',
        
    },
    {
        lx: 'Oracle',
        mc:'192.168.0.027',
        ren:'刘茵茵',
        riqi:'2019年7月07日',
        ml:'E:-备份-2019-08-18 项目资料',
        wz:'项目资料',
        
    },
    {
        lx: 'Oracle',
        mc:'192.168.0.023',
        ren:'赵湾',
        riqi:'2019年7月08日',
        ml:'E:-备份-2019-08-18 项目信息',
        wz:'项目信息',
        
    },
    
]

class Model extends Component<ModelProps, ModelState>{
    state: ModelState = {
        saveVisible: false,
        data: mockData,
        currentItem: {},
    }

    columns: ColumnProps<any>[] = [
        {
            title: '数据库类型',
            dataIndex: 'lx',
            
        },
        {
            title: '主站IP',
            dataIndex: 'mc',
        },
       

        {
            title: '备份日期',
            dataIndex: 'riqi',
        },
        {
            title: '备份类型',
            dataIndex: 'wz',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '备份存放路径',
            dataIndex: 'ml',
        },
        {
            title: '备份操作人',
            dataIndex: 'ren',
            render: (text) => <Tag color="magenta">{text}</Tag>,
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
                title="备份任务管理"
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

export default Model;
