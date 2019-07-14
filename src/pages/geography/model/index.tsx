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
        hj: '环节06-生产',
        dw:'食品接触材料分析单位',
        ren:'刘威',
        riqi:'2019年7月12日',
        bm:'安全局',
        qk:'暂停生产',
        process: 100,
        
    },
    {
        hj: '环节04-加工',
        dw:'食品检验分析单位',
        ren:'孟浩',
        riqi:'2019年7月02日',
        bm:'监察局',
        qk:'封存不合格食品',
        process: 61,
        
    },
    {
        hj: '环节01-材料',
        dw:'农产品检验单位',
        ren:'唐宇',
        riqi:'2019年7月13日',
        bm:'食品质量监督检验中心',
        qk:'封存问题食品',
        process: 74,
        
    },
    {
        hj: '环节02-配比',
        dw:'接触材料分析单位',
        ren:'李白白',
        riqi:'2019年7月14日',
        bm:'食品安全第三方检验检测机构',
        qk:'暂停生产',
        process: 34,
        
    },
    {
        hj: '环节03-称重',
        dw:'农产品分析单位',
        ren:'明楼',
        riqi:'2019年7月05日',
        bm:'监察局',
        qk:'封存问题食品',
        process: 42,
        
    },
    {
        hj: '环节06-生产',
        dw:'食品分析单位',
        ren:'明玉',
        riqi:'2019年7月06日',
        bm:'食品安全检验检测信息共享中心',
        qk:'暂停生产',
        process: 66,
        
    },
    {
        hj: '环节03-称重',
        dw:'食品材料分析单位',
        ren:'刘茵茵',
        riqi:'2019年7月07日',
        bm:'食品安全第三方检验检测机构',
        qk:'暂停生产',
        process: 78,
        
    },
    {
        hj: '环节04-加工',
        dw:'接触材料分析单位',
        ren:'赵湾',
        riqi:'2019年7月08日',
        bm:'监察局',
        qk:'封存不合格食品',
        process: 56,
        
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
            title: '处置环节',
            dataIndex: 'hj',
        },
        {
            title: '填报单位',
            dataIndex: 'dw',
        },
        {
            title: '填报人',
            dataIndex: 'ren',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '收到检验报告日期',
            dataIndex: 'riqi',
        },
        {
            title: '负责核查处置部门',
            dataIndex: 'bm',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '产品控制情况',
            dataIndex: 'qk',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '分析进度',
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
                title="材料分析设置"
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
