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
        dw:'6:00',
        ren:'G（高速动车）',
        riqi:'80',
        qk:'双寨站-扎麻隆站-石崖庄站',
        process: 1,
        
    },
    {
        hj: 'MESBH0232',
        dw:'6:15',
        ren:'C（城际动车）',
        riqi:'60',
        qk:'成都--德阳--绵阳--江油--广元--略阳',
        process: 5,
        
    },
    {
        hj: 'MESBH0233 ',
        dw:'6:30',
        ren:'D（普通动车）',
        riqi:'80',
        qk:'江油--广元--略阳--微县--宝鸡',
        process: 2,
        
    },
    {
        hj: 'MESBH0234',
        dw:'7:00',
        ren:'Z（直达特快）',
        riqi:'60',
        qk:'西安--渭南--华山--三门峡西',
        process: 1,
        
    },
    {
        hj: 'MESBH0235',
        dw:'8:30',
        ren:'T（特快）',
        riqi:'40',
        qk:'洛阳--新乡--汤阴--安阳--邯郸',
        process:8,
        
    },
    {
        hj: 'MESBH0236',
        dw:'8:00',
        ren:'K（快速）',
        riqi:'30',
        qk:'邯郸--沙河市--邢台--石家庄--定州',
        process: 7,
        
    },
    {
        hj: 'MESBH0237',
        dw:'9:30',
        ren:'L（临客）',
        riqi:'40',
        qk:'汤阴--安阳--邯郸--沙河市--邢台',
        process:6,
        
    },
    {
        hj: 'MESBH0238',
        dw:'9:00',
        ren:'Y（旅游列车）',
        riqi:'60',
        qk:'石家庄--定州--保定--高碑店--北京西',
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
            title: '发车时刻',
            dataIndex: 'dw',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '列车类别',
            dataIndex: 'ren',
            render: (text) => <Tag color="red">{text}</Tag>,
        },

        {
            title: '票价',
            dataIndex: 'riqi',
            render: (text) => <Tag color="#003">{text}</Tag>,
        },
        {
            title: '沿途车站',
            dataIndex: 'qk',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '余票占比',
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
                title="车次信息"
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
