import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag } from "antd";
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
       id: 'HFWJ0132',
       mc:'项目负责人要点',
       lx:'Word',
       dx:'3273kb',
       rq:'2019年7月14日14:59:05',
       jc:'全检通过',
       status:'6',
    },
    {
        id: 'HFWJ0149',
        mc:'项目资料',
        lx:'PPT',
        dx:'769kb',
        rq:'2019年7月09日19:26:53',
        jc:'快检通过',
        status:'95',
     },
     {
        id: 'HFWJ0103',
        mc:'项目信息',
        lx:'Word',
        dx:'3273kb',
        rq:'2019年7月06日18:49:05',
        jc:'全检通过',
        status:'67',
     },
     {
         id: 'HFWJ0106',
         mc:'项目会议记录',
         lx:'PPT',
         dx:'769kb',
         rq:'2019年7月10日11:36:53',
         jc:'快检通过',
         status:'67',

      },
      {
        id: 'HFWJ0178',
        mc:'轻音乐',
        lx:'Word',
        dx:'325kb',
        rq:'2019年7月11日10:28:05',
        jc:'全检通过',
        status:'27',
     },
     {
         id: 'HFWJ0118',
         mc:'项目图片',
         lx:'PPT',
         dx:'398kb',
         rq:'2019年7月10日09:15:53',
         jc:'快检通过',
         status:'54',
      },
      {
        id: 'HFWJ0132',
        mc:'项目负责人要点',
        lx:'Word',
        dx:'1268kb',
        rq:'2019年7月12日06:16:05',
        jc:'全检通过',
        status:'100',
     },
     {
         id: 'HFWJ0149',
         mc:'项目资料',
         lx:'PPT',
         dx:'3654kb',
         rq:'2019年6月14日09:54:53',
         jc:'快检通过',
         status:'23',
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '恢复文件名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '恢复文件类型',
            dataIndex: 'lx',
            
        },
        {
            title: '恢复文件大小',
            dataIndex: 'dx',
        },
        {
            title: '恢复文件日期',
            dataIndex: 'rq',
        },
        {
            title: '快速检测恢复文件',
            dataIndex: 'jc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '备份恢复进度',
            dataIndex: 'status',
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
                title="备份恢复管理"
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
