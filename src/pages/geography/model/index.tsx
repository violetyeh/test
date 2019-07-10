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
        id: 'JZZX23',
        pinlv: '广告行业23',
        date: '电视剧插入广告',
        model: '初高学生',
        type: 'APP广告',
        process: 87,
        status: '启用',
    },
    {
        id: 'JZZX36',
        pinlv: '广告行业36',
        date: '综艺代言广告',
        model: '全职妈妈',
        type: '电视广告',
        process: 65,
        status: '启用',
    },
    {
        id: 'JZZX15',
        pinlv: '广告行业15',
        date: '电视剧插入广告',
        model: '全职妈妈',
        type: '电视广告',
        process: 71,
        status: '启用',
    },
    {
        id: 'JZZX24',
        pinlv: '广告行业24',
        date: '综艺代言广告',
        model: '全职妈妈',
        type: '广播广告',
        process: 72,
        status: '启用',
    },
    {
        id: 'JZZX39',
        pinlv: '广告行业39',
        date: '电视剧插入广告',
        model: '宝妈',
        type: '电视广告',
        process: 13,
        status: '启用',
    },
    {
        id: 'JZZX40',
        pinlv: '广告行业40',
        date: '电视剧插入广告',
        model: '全职妈妈',
        type: '电视广告',
        process: 44,
        status: '启用',
    },
    {
        id: 'JZZX11',
        pinlv: '广告行业11',
        date: '电视剧插入广告',
        model: '宝妈',
        type: '电视广告',
        process: 38,
        status: '启用',
    },
    {
        id: 'JZZX14',
        pinlv: '广告行业14',
        date: '综艺代言广告',
        model: '全职妈妈',
        type: '电视广告',
        process: 56,
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '精准广告投放资源',
            dataIndex: 'pinlv',
        },
        {
            title: '精准投放渠道',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '精准广告目标人群',
            dataIndex: 'model',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '精准广告定向',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '精准率',
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
                title="投放操作管理"
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
