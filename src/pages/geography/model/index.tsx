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
        id:'SJCT006',
        cf:'北部隧道ZM-41',
        dw:'3支路A相欠流（0.0A）',
        jg:'过渡段',
        jx:'读取数据失败',
        status: '启用',
     },
     {
       id:'SJCT007',
       cf:'龙山隧道ZM-08',
       dw:'C相欠流（0.0A）',
       jg:'基本段',
       jx:'读取数据成功',
       status: '启用',
    },
    {
        id:'SJCT008',
        cf:'北部隧道ZM-12',
        dw:'1支路A相欠流（0.0A）',
        jg:'过渡段',
        jx:'读取数据成功',
        status: '启用',
     },
    {
       id:'SJCT001',
       cf:'桃园隧道ZM-28',
       dw:'C相欠流（0.0A）',
       jg:'入口段',
       jx:'读取数据成功',
       status: '启用',
    },
    {
        id:'SJCT002',
        cf:'北部隧道ZM-36',
        dw:'2支路A相欠流（0.0A）',
        jg:'基本段',
        jx:'读取数据成功',
        status: '启用',
     },
     {
        id:'SJCT003',
        cf:'龙山隧道ZM-115',
        dw:'3支路A相欠流（0.0A）',
        jg:'入口段',
        jx:'读取数据成功',
        status: '启用',
     },
     {
        id:'SJCT004',
        cf:'北部隧道ZM-025',
        dw:'A相亮灯（2.6A）',
        jg:'出口段',
        jx:'读取数据失败',
        status: '启用',
     },
     {
         id:'SJCT005',
         cf:'北部隧道ZM-63',
         dw:'转换开关1#失控',
         jg:'入口段',
         jx:'读取数据成功',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '监控点名称',
            dataIndex: 'cf',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '隧道照明段',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '反馈信息',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '告警栏',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
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
                title="监控点管理"
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
