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
                title="编辑电影排期信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="电影类型" >
                        {getFieldDecorator('id', {
                        initialValue: currentItem.id,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="name" label="类别" >
                        {getFieldDecorator('name', {
                        initialValue: currentItem.name,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="type" label="版本" >
                        {getFieldDecorator('type', {
                        initialValue: currentItem.type,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="date" label="上级分类" >
                        {getFieldDecorator('date', {
                        initialValue: currentItem.date,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="creator" label="下级分类" >
                        {getFieldDecorator('creator', {
                        initialValue: currentItem.creator,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="column" label="时间" >
                        {getFieldDecorator('column', {
                        initialValue: currentItem.column,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="status" label="购票率（%）" >
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
