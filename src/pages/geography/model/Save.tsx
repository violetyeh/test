import { Component } from "react";
import { Form, Modal, Input, message, DatePicker, Radio } from "antd";
import { ForcfomponentProps } from "antd/lib/form";
import React from "react";
import styles from '../style.less';
import { Dispatch } from "redux";

interface SaveProps extends ForcfomponentProps {
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
                title="编辑开发运营信息"
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
                    <Form.Item key="mc" label="开发项目名称" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="cf" label="IP地址" >
                        {getFieldDecorator('cf', {
                            initialValue: currentItem.cf,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jc" label="MAC地址" >
                        {getFieldDecorator('jc', {
                            initialValue: currentItem.jc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="dw" label="端口" >
                        {getFieldDecorator('dw', {
                            initialValue: currentItem.dw,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jg" label="状态" >
                        {getFieldDecorator('jg', {
                            initialValue: currentItem.jg,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jx" label="报告是否提交" >
                        {getFieldDecorator('jx', {
                            initialValue: currentItem.jx,
                        })(
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="a">是</Radio.Button>
                                <Radio.Button value="b">否</Radio.Button>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                    
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
