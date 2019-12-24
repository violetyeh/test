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
        hj: 'MESBH0231',
        dw:'周隼',
        ren:'33',
        riqi:'0.8',
        qk:'1.0',
        process: 1,
        
    },
    {
        hj: 'MESBH0232',
        dw:'李伟',
        ren:'45',
        riqi:'1.0',
        qk:'0.5',
        process: 5,
        
    },
    {
        hj: 'MESBH0233 ',
        dw:'钱多多',
        ren:'25',
        riqi:'1.0',
        qk:'1.0',
        process: 2,
        
    },
    {
        hj: 'MESBH0234',
        dw:'赵思思',
        ren:'20',
        riqi:'0.2',
        qk:'0.3',
        process: 1,
        
    },
    {
        hj: 'MESBH0235',
        dw:'刘杰',
        ren:'33',
        riqi:'1.0',
        qk:'1.0',
        process:8,
        
    },
    {
        hj: 'MESBH0236',
        dw:'陈思超',
        ren:'45',
        riqi:'1.2',
        qk:'0.9',
        process: 7,
        
    },
    {
        hj: 'MESBH0237',
        dw:'王猛',
        ren:'12',
        riqi:'0.6',
        qk:'1.3',
        process:6,
        
    },
    {
        hj: 'MESBH0238',
        dw:'张宇',
        ren:'30',
        riqi:'5.0',
        qk:'1.2',
        process: 4,
        
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
            title: '姓名',
            dataIndex: 'dw',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '年龄',
            dataIndex: 'ren',
            render: (text) => <Tag color="red">{text}</Tag>,
        },

        {
            title: '左眼视力',
            dataIndex: 'riqi',
            render: (text) => <Tag color="#003">{text}</Tag>,
        },
        {
            title: '右眼视力',
            dataIndex: 'qk',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '检查进度',
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
                title="眼底照相信息"
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
