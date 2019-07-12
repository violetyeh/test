import { Component } from "react";
import { Form, Modal, Input, message, DatePicker } from "antd";
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
                title="编辑无机元素检测设置"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="zl" label="样品种类" >
                        {getFieldDecorator('zl', {
                            initialValue: currentItem.zl,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mc" label="样品名称" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="sj" label="送检单位" >
                        {getFieldDecorator('sj', {
                            initialValue: currentItem.sj,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="zb" label="无机元素占比" >
                        {getFieldDecorator('zb', {
                            initialValue: currentItem.zb,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="process" label="检测结果进度" >
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
