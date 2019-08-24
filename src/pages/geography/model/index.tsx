import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress } from "antd";
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
        hj: 'vpc-k9ffk5ad test01',
        dw:'10.0.0.0/16',
        ren:'刘威',
        riqi:'0.25核',
        qk:'0.25GB',
        process: 31,
        
    },
    {
        hj: 'vpc-bu3ei1l3 test02',
        dw:'172.16.0.0/20',
        ren:'孟浩',
        riqi:'4核',
        qk:'2GB',
        process: 65,
        
    },
    {
        hj: 'vpc-oiejnydh  test03 ',
        dw:'172.16.0.0/22',
        ren:'唐宇',
        riqi:'2核',
        qk:'1.25GB',
        process: 42,
        
    },
    {
        hj: 'vpc-50f5o6yx  test04',
        dw:'192.168.0.0/20',
        ren:'李白白',
        riqi:'1核',
        qk:'1GB',
        process: 51,
        
    },
    {
        hj: 'vpc-k9ffk5ad test05',
        dw:'10.0.0.0/19',
        ren:'明楼',
        riqi:'1核',
        qk:'0.75GB',
        process:82,
        
    },
    {
        hj: 'vpc-bu3ei1l3 test06',
        dw:'192.168.0.0/18',
        ren:'明玉',
        riqi:'0.5核',
        qk:'0.25GB',
        process: 76,
        
    },
    {
        hj: 'vpc-oiejnydh  test07',
        dw:'10.0.0.0/15',
        ren:'刘茵茵',
        riqi:'0.5核',
        qk:'0.5GB',
        process:65,
        
    },
    {
        hj: 'vpc-50f5o6yx  test08',
        dw:'10.0.0.0/14',
        ren:'赵湾',
        riqi:'0.25核',
        qk:'0.25GB',
        process: 45,
        
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
            title: '编号',
            dataIndex: 'hj',
            render: (text) => <Tag color="#123">{text}</Tag>,
        },
        {
            title: 'CIDR',
            dataIndex: 'dw',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '管理人',
            dataIndex: 'ren',
            render: (text) => <Tag color="red">{text}</Tag>,
        },

        {
            title: 'CPU',
            dataIndex: 'riqi',
            render: (text) => <Tag color="#003">{text}</Tag>,
        },
        {
            title: '内存',
            dataIndex: 'qk',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '网络效率',
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
                title="私有网络管理"
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
