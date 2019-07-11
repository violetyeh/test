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
        id: 'SCKC04512',
        shijian:'2019年7月11日12:27:58',
        biaozhun:'体积比为3.0％',
        duizhao:'0.23',
        jiance:'郑峰',
        bianhao:'JCA012302',
        process: 30,
        status: '启用',
    },
    {
        id: 'SCKC04513',
        shijian:'2019年7月11日13:11:19',
        biaozhun:'体积比为3.0％',
        duizhao:'0.23',
        jiance:'王媛',
        bianhao:'JCA012303',
        process: 30,
        status: '启用',
    },
    {
        id: 'SCKC04514',
        shijian:'2019年7月11日13:11:24',
        biaozhun:'体积比为3.0％',
        duizhao:'0.23',
        jiance:'刘琦歌',
        bianhao:'JCA012304',
        process: 30,
        status: '启用',
    },
    {
        id: 'SCKC04515',
        shijian:'2019年7月10日14:11:29',
        biaozhun:'体积比为3.0％',
        duizhao:'0.2305',
        jiance:'李武雨',
        bianhao:'JCA0123',
        process: 30,
        status: '启用',
    },
    {
        id: 'SCKC04516',
        shijian:'2019年7月08日08:31:46',
        biaozhun:'体积比为3.0％',
        duizhao:'0.23',
        jiance:'王可可',
        bianhao:'JCA012306',
        process: 30,
        status: '启用',
    },
    {
        id: 'SCKC04517',
        shijian:'2019年7月06日09:06:04',
        biaozhun:'体积比为3.0％',
        duizhao:'0.23',
        jiance:'吴启拉',
        bianhao:'JCA012307',
        process: 30,
        status: '启用',
    },
    {
        id: 'SCKC04518',
        shijian:'2019年7月10日10:12:26',
        biaozhun:'体积比为3.0％',
        duizhao:'0.23',
        jiance:'赵元乐',
        bianhao:'JCA012308',
        process: 30,
        status: '启用',
    },
    {
        id: 'SCKC04519',
        shijian:'2019年7月11日13:12:37',
        biaozhun:'体积比为3.0％',
        duizhao:'0.23',
        jiance:'王可媛',
        bianhao:'JCA012309',
        process: 30,
        status: '启用',
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
            title: '检测编号',
            dataIndex: 'id',
        },
        {
            title: '检测时间',
            dataIndex: 'shijian',
        },
        {
            title: '合格标准',
            dataIndex: 'biaozhun',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '对照值',
            dataIndex: 'duizhao',
        },
        {
            title: '检测员',
            dataIndex: 'jiance',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '硬件编号',
            dataIndex: 'bianhao',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '检测进度',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },

        {
            title: '是否启用',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
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
                title="兽药残留检测设置"
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
