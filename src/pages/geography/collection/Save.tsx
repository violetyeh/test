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
                title="编辑工程项目信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="编号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="tongdao" label="工程名称" >
                        {getFieldDecorator('tongdao', {
                            initialValue: currentItem.tongdao,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="touguang" label="项目计划状态" >
                        {getFieldDecorator('touguang', {
                            initialValue: currentItem.touguang,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="duizhao" label="监理负责人" >
                        {getFieldDecorator('duizhao', {
                            initialValue: currentItem.duizhao,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="shijain" label="监理状态" >
                        {getFieldDecorator('shijian', {
                            initialValue: currentItem.shijian,
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
