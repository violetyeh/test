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
        lx: '主站',
        mc:'登录地址',
        ren:'刘威',
        riqi:'2019年7月12日',
        ml:'登录',
        wz:'http://youxi.com#/./login',
        process: 100,
        
    },
    {
        lx: '副站',
        mc:'注册地址',
        ren:'孟浩',
        riqi:'2019年7月02日',
        ml:'注册',
        wz:'http://youxi.com#/./zhuce',
        process: 61,
        
    },
    {
        lx: '主站',
        mc:'人员管理地址',
        ren:'唐宇',
        riqi:'2019年7月13日',
        ml:'人员管理',
        wz:'http://youxi.com#/./renyuan',
        process: 74,
        
    },
    {
        lx: '副站',
        mc:'权限管理地址',
        ren:'李白白',
        riqi:'2019年7月14日',
        ml:'权限管理',
        wz:'http://youxi.com#/./quanxian',
        
    },
    {
        lx: '副站',
        mc:'密码修改地址',
        ren:'明楼',
        riqi:'2019年7月05日',
        ml:'密码修改',
        wz:'http://youxi.com#/./xiugai',
        
    },
    {
        lx: '副站',
        mc:'添加用户地址',
        ren:'明玉',
        riqi:'2019年7月06日',
        ml:'添加用户',
        wz:'http://youxi.com/#/./add',
        
    },
    {
        lx: '主站',
        mc:'操作地址',
        ren:'刘茵茵',
        riqi:'2019年7月07日',
        ml:'操作',
        wz:'http://youxi.com#/./caozuo',
        
    },
    {
        lx: '主站',
        mc:'修改编辑地址',
        ren:'赵湾',
        riqi:'2019年7月08日',
        ml:'修改编辑',
        wz:'http://youxi.com#/./xiugai',
        
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
            title: 'URL类型',
            dataIndex: 'lx',
            
        },
        {
            title: 'URL名称',
            dataIndex: 'mc',
        },
       

        {
            title: '创建日期',
            dataIndex: 'riqi',
        },
        {
            title: '网址',
            dataIndex: 'wz',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: 'URL目录',
            dataIndex: 'ml',
        },
        {
            title: '创建人',
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
                title="URL管理"
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
