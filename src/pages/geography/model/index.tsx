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
       id:'ZJ-001',
       cf:'d8e2ds6f5sdf12df15sdf45sdf4',
       jc:'6C:F0:49:8F:A5:39',
       dw:'34/tcp',
       jg:'36',
       jx:'42',
       status: '启用',
    },
    {
        id:'ZJ-002',
        cf:'a2sd1a5sd5f45a1d2a1d5ad15a',
        jc:'7C:F0:19:8F:A5:Z4',
        dw:'52/tcp',
        jg:'61',
        jx:'52',
        status: '启用',
     },
     {
        id:'ZJ-003',
        cf:'sa5d454f5e48f4s2c12xc12d1f',
        jc:'9C:K0:49:8F:A5:50',
        dw:'57/tcp',
        jg:'28',
        jx:'91',
        status: '启用',
     },
     {
        id:'ZJ-004',
        cf:'a2sda21f5s5a5s1d2ffs5s4da51',
        jc:'3C:F5:49:8F:G5:10',
        dw:'16/tcp',
        jg:'47',
        jx:'63',
        status: '启用',
     },
     {
         id:'ZJ-005',
         cf:'a21sd5af51x2z1xcs2d1f5s5df',
         jc:'6C:F0:49:8F:Q5:55',
         dw:'06/tcp',
         jg:'15',
         jx:'38',
         status: '启用',
      },
      {
         id:'ZJ-006',
         cf:'asd45asf4s12zs1d5a4d5a1x7a9',
         jc:'6Q:F0:49:8F:A5:74',
         dw:'45/tcp',
         jg:'29',
         jx:'54',
         status: '启用',
      },
      {
        id:'ZJ-007',
        cf:'a3sda212sd1f5as1d2a1d2d6g8',
        jc:'6C:F1:49:8Q:A5:C6',
        dw:'56/tcp',
        jg:'36',
        jx:'34',
        status: '启用',
     },
     {
         id:'ZJ-008',
         cf:'s2f5g4t7hsd5s8d9f33v2ss5',
         jc:'1C:F0:D9:8F:A5:96',
         dw:'23/tcp',
         jg:'53',
         jx:'84',
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
            title: '设备标识',
            dataIndex: 'cf',
        },
        {
            title: 'MAC地址',
            dataIndex: 'jc',
        },
        {
            title: '端口',
            dataIndex: 'dw',
            render: (text) => <Tag color="red">{text}</Tag>,
        },

        {
            title: 'cpu占用率（%）',
            dataIndex: 'jg',
            render: (text) => <Progress percent={text} status="active" />,
        },
        {
            title: '内存使用率（%）',
            dataIndex: 'jx',
            render: (text) => <Progress percent={text} status="active" />,
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
                title="主机配置"
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
