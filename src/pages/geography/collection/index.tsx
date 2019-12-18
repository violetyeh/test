import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Progress } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";
import { Chart, View, Geom, Label } from "bizcharts";
import DataSet from '@antv/data-set';
import dituData from "./mockdata";


interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    currentItem: any;
    data: any[];
}

const mockData = [
   
      {
        id: '商业电影',
        name: '贺岁电影系列',
        type: '2D',
        date: '商业影片',
        creator: '贺岁电影',
        column:'120分钟电影',
        status: 10,
      },
      {
        id: '国庆电影',
        name: '国庆档',
        type: '3D',
        date: '国庆',
        creator: '警民同心 平安国庆',
        column:'125分钟电影',
        status: 30,
      },
      {
        id: '国庆电影',
        name: '国庆档',
        type: '3D',
        date: '国庆',
        creator: '战斗英雄张富清',
        column:'130分钟电影',
        status: 17,
      },
      {
        id: '文艺电影',
        name: '五一档',
        type: '2D',
        date: '喜剧',
        creator: '文艺影片',
        column:'120分钟电影',
        status: 20,
      },
      {
        id: '喜剧电影',
        name: '五一档',
        type: '2D',
        date: '喜剧影片',
        creator: '喜剧',
        column:'150分钟电影',
        status: 15,
      },
      {
        id: '商业电影',
        name: '五一档',
        type: '2D',
        date: '商业影片',
        creator: '喜剧',
        column:'130分钟电影',
        status: 30,
      },
      {
        id: '商业电影',
        name: '恐怖系列',
        type: '2D',
        date: '商业影片',
        creator: '恐怖',
        column:'120分钟电影',
        status: 9,
      },
      {
        id: '商业电影',
        name: '探案系列',
        type: '3D',
        date: '商业影片',
        creator: '探案',
        column:'145分钟电影',
        status: 16,
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
            title: '电影类型',
            dataIndex: 'id',
            render: (text) => <Tag color="magenta">{text}</Tag>,
          },
          {
            title: '类别',
            dataIndex: 'name',
          },
          {
            title: '版本',
            dataIndex: 'type',
          },
          {
            title: '上级分类',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
          },
          {
            title: '下级分类',
            dataIndex: 'creator',
            render: (text) => <Tag color="magenta">{text}</Tag>,
          },
          {
            title: '时间',
            dataIndex: 'column',
          },
          {
            title: '购票率',
            dataIndex: 'status',
            render: (text) => <Progress percent={text} status="active" />,
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
        const { saveVisible, currentItem, data } = this.state;

        return (
            <PageHeaderWrapper
                title="电影排期信息"
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
            </PageHeaderWrapper >
        );
    }
}

export default Type;
