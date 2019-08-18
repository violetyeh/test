import { Component } from "react";
import { Form, Modal, Input, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";
import styles from '../style.less';
import { Dispatch } from "redux";
import Radio from "antd/es/radio";

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
                title="编辑数据信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="序号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mc" label="名称" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="bm" label="保管期限" >
                        {getFieldDecorator('bm', {
                            initialValue: currentItem.bm,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="px" label="档号" >
                        {getFieldDecorator('px', {
                            initialValue: currentItem.px,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="lj" label="备份日期" >
                        {getFieldDecorator('lj', {
                            initialValue: currentItem.lj,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="nr" label="数据类型" >
                        {getFieldDecorator('nr', {
                            initialValue: currentItem.nr,
                        })(
                            <Radio.Group >
                                <Radio value={1}>txt</Radio>
                                <Radio value={2}>相册</Radio>
                                <Radio value={3}>视频</Radio>
                                <Radio value={4}>链接</Radio>
                            </Radio.Group >
                        )}
                    </Form.Item>
                    <Form.Item key="status" label="备份进度(%)" >
                        {getFieldDecorator('status', {
                            initialValue: currentItem.status,
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
