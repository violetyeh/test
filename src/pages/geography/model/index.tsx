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
       id:'TZBZ021',
       cf:'第一次出图版本号为0 ',
       jc:'第一次图版本号为A ',
       dw:'排版设计#PBSJ027',
       jg:'标高',
       status: '启用',
    },
    {
        id:'TZBZ022',
        cf:'第二次修改图版本号为1',
        jc:'第二次图版本号为B',
        dw:'排版设计#PBSJ053',
        jg:'尺寸起止符号用中粗线绘制，长度为2~3mm。 ',
        status: '启用',
     },
     {
        id:'TZBZ023',
        cf:'第三次修改图版本号为2 ',
        jc:'第三次图版本号为C',
        dw:'排版设计#PBSJ002',
        jg:'尺寸界线、尺寸线，应用细实线绘制，端部出头2mm。',
        status: '启用',
     },
     {
        id:'TZBZ024',
        cf:'第一次出图版本号为0 ',
        jc:'第一次图版本号为A ',
        dw:'排版设计#PBSJ051',
        jg:'引出线均采用水平向0.25宽细线，文字说明均写於水平线之上。',
        status: '启用',
     },
     {
         id:'TZBZ025',
         cf:'第二次修改图版本号为1',
         jc:'第二次图版本号为B',
         dw:'排版设计#PBSJ092',
         jg:'详图：详图符号以粗实线绘制',
         status: '启用',
      },
      {
         id:'TZBZ026',
         cf:'第三次修改图版本号为2 ',
         jc:'第三次图版本号为C',
         dw:'排版设计#PBSJ078',
         jg:'索引符号，索引符号的圆及直径均应以细实线绘制。',
         status: '启用',
      },
      {
        id:'TZBZ027',
        cf:'第二次修改图版本号为1',
        jc:'第二次图版本号为B',
        dw:'排版设计#PBSJ046',
        jg:'剖切线',
        status: '启用',
     },
     {
         id:'TZBZ028',
         cf:'第三次修改图版本号为2 ',
         jc:'第三次图版本号为C',
         dw:'排版设计#PBSJ023',
         jg:'轴线。轴线圆均应以细实线绘制。 ',
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
            title: '排版设计名称',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '一次用图版本号',
            dataIndex: 'cf',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '二次用图版本号',
            dataIndex: 'jc',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '排版符号',
            dataIndex: 'jg',
            render: (text) => <Tag color="blue">{text}</Tag>,
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
                title="排版设计编制"
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
