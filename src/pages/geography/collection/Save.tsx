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
                title="编辑食品检测信息"
                classlx={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="ID" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="lx" label="食品名称" >
                        {getFieldDecorator('lx', {
                            initialValue: currentItem.lx,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="yp" label="过敏对象" >
                        {getFieldDecorator('remark', {
                            initialValue: currentItem.yp,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="xx" label="过敏源数量" >
                        {getFieldDecorator('xx', {
                            initialValue: currentItem.xx,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="sx" label="过量限制" >
                        {getFieldDecorator('sx', {
                            initialValue: currentItem.sx,
                        })(
                            <Input.TextArea rows={2} />,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
