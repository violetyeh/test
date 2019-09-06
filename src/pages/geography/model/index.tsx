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
        hj: 'CTQC01201',
        dw:'特大型客车(长度大于12米)',
        ren:'刘威',
        riqi:'80',
        qk:'有',
        process: 1,
        
    },
    {
        hj: 'CTQC01202',
        dw:'大型客车(长度为9-12米)',
        ren:'孟浩',
        riqi:'60',
        qk:'无',
        process: 5,
        
    },
    {
        hj: 'CTQC01203 ',
        dw:'特大型客车(长度大于12米)',
        ren:'唐宇',
        riqi:'80',
        qk:'有',
        process: 2,
        
    },
    {
        hj: 'CTQC01204',
        dw:'大型客车(长度为9-12米)',
        ren:'李白白',
        riqi:'60',
        qk:'无',
        process: 1,
        
    },
    {
        hj: 'CTQC01205',
        dw:'中型客车(长度为6-9米)',
        ren:'明楼',
        riqi:'40',
        qk:'有',
        process:8,
        
    },
    {
        hj: 'CTQC01206',
        dw:'小于6米的小型客车',
        ren:'明玉',
        riqi:'30',
        qk:'无',
        process: 7,
        
    },
    {
        hj: 'CTQC01207',
        dw:'中型客车(长度为6-9米)',
        ren:'刘茵茵',
        riqi:'40',
        qk:'有',
        process:6,
        
    },
    {
        hj: 'CTQC01208',
        dw:'大型客车(长度为9-12米)',
        ren:'赵湾',
        riqi:'60',
        qk:'有',
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
            title: '长途汽车编号',
            dataIndex: 'hj',
            render: (text) => <Tag color="#123">{text}</Tag>,
        },
        {
            title: '长途汽车车型',
            dataIndex: 'dw',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '驾驶员',
            dataIndex: 'ren',
            render: (text) => <Tag color="red">{text}</Tag>,
        },

        {
            title: '汽车座位数量',
            dataIndex: 'riqi',
            render: (text) => <Tag color="#003">{text}</Tag>,
        },
        {
            title: '有无空调',
            dataIndex: 'qk',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '汽车磨损度',
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
                title="长途汽车信息管理"
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
