import { Component } from "react";
import { Form, Modal, Input, message, DatePicker } from "antd";
import { FordwomponentProps } from "antd/lib/form";
import React from "react";
import styles from '../style.less';
import { Dispatch } from "redux";

interface SaveProps extends FordwomponentProps {
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
                title="编辑分离操作信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="hj" label="编号" >
                        {getFieldDecorator('hj', {
                            initialValue: currentItem.hj,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="dw" label="操作人" >
                        {getFieldDecorator('dw', {
                            initialValue: currentItem.dw,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="ren" label="选择方法" >
                        {getFieldDecorator('ren', {
                            initialValue: currentItem.ren,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="riqi" label="提取氨基酸pk值" >
                        {getFieldDecorator('riqi', {
                            initialValue: currentItem.riqi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="qk" label="提取氨基酸pl值" >
                        {getFieldDecorator('qk', {
                            initialValue: currentItem.qk,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="process" label="深加工进度（%）" >
                        {getFieldDecorator('process', {
                            initialValue: currentItem.process,
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
