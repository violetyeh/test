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
                title="编辑客服分配信息"
                className={styles.standardListForm}
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
                    <Form.Item key="fenlei" label="角色" >
                        {getFieldDecorator('fenlei', {
                            initialValue: currentItem.fenlei,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="pinlv" label="分配进度（%）" >
                        {getFieldDecorator('pinlv', {
                            initialValue: currentItem.pinlv,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="yaosu" label="所属分组" >
                        {getFieldDecorator('yaosu', {
                            initialValue: currentItem.yaosu,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="fenceng" label="接待人数" >
                        {getFieldDecorator('fenceng', {
                            initialValue: currentItem.fenceng,
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
