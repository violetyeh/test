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
        id:'AMM-01201',
        cf:'#WRJ[COVI03]',
        dw:'安全监理',
        jg:'11',
        jx:'#3QWSA无人机',
        status: '启用',
     },
     {
         id:'AMM-01202',
         cf:'#WRJ[COVI03]',
         dw:'人员监理',
         jg:'15',
         jx:'#3ASZX无人机',
         status: '启用',
      },
      {
         id:'AMM-01203',
         cf:'#WRJ[COVI02]',
         dw:'进度监理',
         jg:'25',
         jx:'#2ASZX无人机',
         status: '启用',
      },
      {
         id:'AMM-01204',
         cf:'#WRJ[COVI00]',
         dw:'安全监理',
         jg:'15',
         jx:'#0ASZX无人机',
         status: '启用',
      },
      {
          id:'AMM-01205',
          cf:'#WRJ[COVI01]',
          dw:'人员监理',
          jg:'20',
          jx:'#1ASZX无人机',
          status: '启用',
       },
    {
        id:'AMM-01206',
        cf:'#WRJ[COVI00]',
        dw:'人员监理',
        jg:'15',
        jx:'#0QWSA无人机',
        status: '启用',
     },
     {
       id:'AMM-01207',
       cf:'#WRJ[COVI01]',
       dw:'安全监理',
       jg:'5',
       jx:'#1QWSA无人机',
       status: '启用',
    },
    {
        id:'AMM-01208',
        cf:'#WRJ[COVI02]',
        dw:'进度监理',
        jg:'8',
        jx:'#2QWSA无人机',
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
            title: '无人机名称',
            dataIndex: 'jx',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '型号',
            dataIndex: 'cf',
        },
        {
            title: '监理类型',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '监理信息数量',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
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
                title="无人机管理"
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
