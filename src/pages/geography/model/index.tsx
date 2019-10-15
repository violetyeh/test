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
        hj: 'PCID01',
        dw:'出口',
        ren:'刘威',
        riqi:'CHUAN80',
        qk:'中型',
        process: 91,
        
    },
    {
        hj: 'PCID02',
        dw:'进口',
        ren:'孟浩',
        riqi:'CHUAN60',
        qk:'小型',
        process: 35,
        
    },
    {
        hj: 'PCID03 ',
        dw:'进口',
        ren:'唐宇',
        riqi:'CHUAN80',
        qk:'中型',
        process: 100,
        
    },
    {
        hj: 'PCID04',
        dw:'出口',
        ren:'李白白',
        riqi:'CHUAN60',
        qk:'小型',
        process: 51,
        
    },
    {
        hj: 'PCID05',
        dw:'进口',
        ren:'明楼',
        riqi:'CHUAN40',
        qk:'中型',
        process:68,
        
    },
    {
        hj: 'PCID06',
        dw:'进口',
        ren:'明玉',
        riqi:'CHUAN30',
        qk:'小型',
        process: 97,
        
    },
    {
        hj: 'PCID07',
        dw:'出口',
        ren:'刘茵茵',
        riqi:'CHUAN40',
        qk:'中型',
        process:96,
        
    },
    {
        hj: 'PCID08',
        dw:'进口',
        ren:'赵湾',
        riqi:'CHUAN60',
        qk:'中型',
        process: 94,
        
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
            title: '批次编号',
            dataIndex: 'hj',
            render: (text) => <Tag color="#123">{text}</Tag>,
        },
        {
            title: '进出口',
            dataIndex: 'dw',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '管理员',
            dataIndex: 'ren',
            render: (text) => <Tag color="red">{text}</Tag>,
        },

        {
            title: '船名称',
            dataIndex: 'riqi',
            render: (text) => <Tag color="#003">{text}</Tag>,
        },
        {
            title: '货柜箱型',
            dataIndex: 'qk',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '装箱进度',
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
        message.error('核心数据，小型法删除');
    }
    render() {
        const { saveVisible, data, currentItem } = this.state;
        return (
            <PageHeaderWrapper
                title="批次管理"
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
