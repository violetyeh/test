import { Component } from "react";
import { Form, Modal, Input, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";
import styles from '../style.less';
import { Dispatch } from "redux";

interface SaveProps extends FormComponentProps {
    dispatch?: Dispatch<any>;
    handleSaveVisible: () => void;
    currentItem: {};
}

interface SaveState {
}
class Save extends Component<SaveProps, SaveState>{

    state: SaveState = {
        roleList: [],
    }

    handleSave = () => {
        message.success('保存成功');
    }

    render() {

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const { form: { getFieldDecorator }, handleSaveVisible, currentItem } = this.props;
        console.log(currentItem, 'item');
        return (
            <Modal
                title="编辑动物源食品分析数据"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="通道编号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mingcheng" label="动物源食品名称" >
                        {getFieldDecorator('mingcheng', {
                            initialValue: currentItem.mingcheng,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="songjian" label="分析单位" >
                        {getFieldDecorator('songjian', {
                            initialValue: currentItem.songjian,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="shengchan" label="动物源食品生产单位" >
                        {getFieldDecorator('shengchan', {
                            initialValue: currentItem.shengchan,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="chandi" label="动物源食品产地" >
                        {getFieldDecorator('chandi', {
                            initialValue: currentItem.chandi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="riqi" label="生产日期" >
                        {getFieldDecorator('riqi', {
                            initialValue: currentItem.riqi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
