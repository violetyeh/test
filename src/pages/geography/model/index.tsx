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
        id: '购物中心电影院',
        creator: '2号厅',
        project: '叶问4：完结篇',
        status: '即将上映',
        date:'280999人想看',
        process:'86',
      },
      {
        id: '购物中心电影院',
        creator: 'IMAX VIP厅',
        project: '被光抓走的人',
        status: '正在上映',
        date:'7.7分',
        process:'100',
      },
      {
        id: '购物中心电影院',
        creator: '1号厅',
        project: '星球大战：天行者崛起',
        status: '即将上映',
        date:'58882人想看',
        process:'62',
      },
      {
        id: '电影城电影院',
        creator: '1号厅',
        project: '半个喜剧',
        status: '正在上映',
        date:'34012人想看',
        process:'74',
      },
      {
        id: '电影城电影院',
        creator: '3号厅',
        project: '只有芸知道',
        status: '正在上映',
        date:'34012人想看',
        process:'85',
      },
      {
        id: '电影城电影院',
        creator: 'IMAX VIP厅',
        project: '勇敢者游戏2：再战巅峰',
        status:'正在上映',
        date:'7.6分',
        process:'42',
      },
      {
        id: '商业街电影院',
        creator: '4号厅',
        project: '天.火',
        status:'正在上映',
        date:'8.0分',
        process:'76',
      },
      {
        id: '商业街电影院',
        creator: '5号厅',
        project: '误杀',
        status: '正在上映',
        date:'9.5分',
        process:'98',
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
            title: '电影院位置',
            dataIndex: 'id',
          },
          {
            title: '类型',
            dataIndex: 'creator',
          },
          {
            title: '电影名称',
            dataIndex: 'project',
          },
          {
            title: '上映状态',
            dataIndex: 'status',
          },
        {
            title: '评分',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '满座率',
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
                title="电影售票信息"
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
