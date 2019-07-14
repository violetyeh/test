import { Component } from "react";
import { Form, Modal, Input, message, DatePicker, Radio } from "antd";
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
                title="编辑URL信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="lx" label="URL类型" >
                        {getFieldDecorator('lx', {
                            initialValue: currentItem.lx,
                        })(
                                <Radio.Group >
                                  <Radio value={1}>主站</Radio>
                                  <Radio value={2}>副站</Radio>
                                </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item key="mc" label="URL名称" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="ren" label="创建人" >
                        {getFieldDecorator('ren', {
                            initialValue: currentItem.ren,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="riqi" label="创建日期" >
                        {getFieldDecorator('riqi', {
                            initialValue: currentItem.riqi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="wz" label="网址" >
                        {getFieldDecorator('wz', {
                            initialValue: currentItem.wz,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="ml" label="URL目录" >
                        {getFieldDecorator('ml', {
                            initialValue: currentItem.ml,
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
