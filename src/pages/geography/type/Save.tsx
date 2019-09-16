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
                title="编辑安防终端信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="终端ID" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                   
                    <Form.Item key="pinlv" label="终端端口" >
                        {getFieldDecorator('pinlv', {
                            initialValue: currentItem.pinlv,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="yaosu" label="是否在线" >
                        {getFieldDecorator('yaosu', {
                            initialValue: currentItem.yaosu,
                        })(
                            <Input.TextArea rows={2} />,
                        )}
                    </Form.Item>
                    <Form.Item key="sj" label="安防信息传输进度（%）" >
                        {getFieldDecorator('sj', {
                            initialValue: currentItem.sj,
                        })(
                            <Input.TextArea rows={2} />,
                        )}
                    </Form.Item>
                   
                    <Form.Item key="state" label="终端状态检测时间" >
                        {getFieldDecorator('state', {
                            initialValue: currentItem.state,
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
