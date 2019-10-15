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
        id: 'ZDID2136',
        yaosu: '小于25dB',
        state: '0.5dB',
        pinlv: '30-125dB',
        sj:'85',
    },
    {
        id: 'ZDID3354',
        yaosu: '小于35dB',
        state: '1dB',
        pinlv: '30-130dB',
        sj:'60',
    },
    {
        id: 'ZDID1292',
        yaosu: '小于30dB',
        state: '1dB',
        pinlv: '25-130dB',
        sj:'80',
    },
    {
        id: 'ZDID8201',
        yaosu: '小于35dB',
        state: '0.5dB',
        pinlv: '30-130dB',
        sj:'100',
    },
    {
        id: 'ZDID3921',
        yaosu: '小于35dB',
        state: '1dB',
        pinlv: '30-130dB',
        sj:'15',
    },
    {
        id: 'ZDID0029',
        yaosu: '小于25dB',
        state: '1dB',
        pinlv: '30-125dB',
        sj:'16',
    },
    {
        id: 'ZDID2191',
        yaosu: '小于30dB',
        state: '0.5dB',
        pinlv: '25-130dB',
        sj:'28',
    },
    {
        id: 'ZDID3321',
        yaosu: '小于35dB',
        state: '1dB',
        pinlv: '30-130dB',
        sj:'16',
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
            title: 'ID',
            dataIndex: 'id',
        },
       
        {
            title: '测量范围',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '自身噪声',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '处理进度',
            dataIndex: 'sj',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        }, 
       
        {
            title: '最大误差',
            dataIndex: 'state',
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
                title="数据采集处理"
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
