import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag } from "antd";
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
        id: 'LX001',
        jishu: '上海',
        fenceng: '浙江',
        leixing: '142',
        name: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567684071920&di=2f4c7494b4723cc8875582d746614be2&imgtype=0&src=http%3A%2F%2Fi4.hexunimg.cn%2F2013-11-23%2F159957846.jpg',
        state: '启用',
    },
    {
        id: 'LX002',
        jishu: '北京',
        fenceng: '南京',
        leixing: '166',
        name: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567684126327&di=f0c8719df9b1b44d46cb66e9b9a109e6&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fnews%2Ftransform%2F20151113%2F1Yys-fxksqis4780478.jpg',
        state: '启用',
    },
    {
        id: 'LX003',
        jishu: '重庆',
        fenceng: '浙江',
        leixing: '160',
        name: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567684001288&di=2ff300551fffd37458ee0ff06706dbc4&imgtype=0&src=http%3A%2F%2Fimages.china.cn%2Fnews%2Fattachement%2Fjpg%2Fsite3%2F20101214%2F8315822060192708995.jpg',
        state: '启用',
    },
    {
        id: 'LX004',
        jishu: '渝北',
        fenceng: '璧山',
        leixing: '36',
        name: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567683931223&di=6fa0c61b0f5d87b3fe489088c00f0a62&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ffinance%2Fcrawl%2F122%2Fw550h372%2F20180920%2FgMYC-hiixpup1769407.jpg',
        state: '启用',
    },
    {
        id: 'LX005',
        jishu: '江津',
        fenceng: '合川',
        leixing: '45',
        name: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567683931223&di=6fa0c61b0f5d87b3fe489088c00f0a62&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ffinance%2Fcrawl%2F122%2Fw550h372%2F20180920%2FgMYC-hiixpup1769407.jpg',
        state: '启用',
    },
    {
        id: 'LX006',
        jishu: '重庆',
        fenceng: '湖南',
        leixing: '96',
        name: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567684001288&di=2ff300551fffd37458ee0ff06706dbc4&imgtype=0&src=http%3A%2F%2Fimages.china.cn%2Fnews%2Fattachement%2Fjpg%2Fsite3%2F20101214%2F8315822060192708995.jpg',
        state: '启用',
    },
    {
        id: 'LX007',
        jishu: '厦门',
        fenceng: '浙江',
        leixing: '89',
        name: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567684171088&di=907b3fac915d9ba59abdc3891338061d&imgtype=0&src=http%3A%2F%2Fwww.gmw.cn%2Fimages%2F2005-09%2F09%2Fxin_110902092121187147043.jpg',
        state: '启用',
    },
    {
        id: 'LX008',
        jishu: '长沙',
        fenceng: '成都',
        leixing: '110',
        name: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2605272276,2067597409&fm=26&gp=0.jpg',
        state: '启用',
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
            title: '路线编号',
            dataIndex: 'id',
        },
        {
            title: '查看地图',
            dataIndex: 'name',
            render: (text) => {
                return <img src={text} height={80} width={100} />;
            },
        },
        {
            title: '起始地',
            dataIndex: 'jishu',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '目的地',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '公里数',
            dataIndex: 'leixing',
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
                title="运输路线管理"
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
