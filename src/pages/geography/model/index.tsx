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
        id:'IPID001',
        cf:'视觉程序#002',
        dw:'是',
        jg:'0.574',
        jx:'6.241',
        status: '启用',
     },
     {
         id:'IPID002',
         cf:'视觉程序#003',
         dw:'是',
         jg:'7.251',
         jx:'4.357',
         status: '启用',
      },
      {
         id:'IPID003',
         cf:'视觉程序#004',
         dw:'否',
         jg:'5.214',
         jx:'2.541',
         status: '启用',
      },
      {
         id:'IPID004',
         cf:'视觉程序#005',
         dw:'否',
         jg:'3.654',
         jx:'6.321',
         status: '启用',
      },
      {
          id:'IPID005',
          cf:'视觉程序#006',
          dw:'是',
          jg:'4.259',
          jx:'3.258',
          status: '启用',
       },
    {
        id:'IPID006',
        cf:'视觉程序#007',
        dw:'是',
        jg:'0.526',
        jx:'1.478',
        status: '启用',
     },
     {
       id:'IPID007',
       cf:'视觉程序#008',
       dw:'否',
       jg:'19.231',
       jx:'0.254',
       status: '启用',
    },
    {
        id:'IPID008',
        cf:'视觉程序#009',
        dw:'是',
        jg:'2.365',
        jx:'1.247',
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
            title: '程序名称',
            dataIndex: 'cf',
        },
        {
            title: '视觉固定坐标系X',
            dataIndex: 'jg',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '视觉固定坐标系Y',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '是否角度取反',
            dataIndex: 'dw',
            render: (text) => <Tag color="MAGENTA">{text}</Tag>,
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
                title="程序编辑"
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
