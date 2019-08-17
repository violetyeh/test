import { Component } from "react";
import { Form, Modal, Input, message, Radio } from "antd";
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
                title="编辑政务投票"
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
                    <Form.Item key="tongdao" label="发布人" >
                        {getFieldDecorator('tongdao', {
                            initialValue: currentItem.tongdao,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="touguang" label="投票标题" >
                        {getFieldDecorator('touguang', {
                            initialValue: currentItem.touguang,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="xq" label="详情" >
                        {getFieldDecorator('xq', {
                            initialValue: currentItem.xq,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="duizhao" label="匿名投票结果" >
                        {getFieldDecorator('duizhao', {
                            initialValue: currentItem.duizhao,
                        })(
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="a">允许</Radio.Button>
                                <Radio.Button value="b">不允许</Radio.Button>
                             </Radio.Group>,
                        )}
                    </Form.Item>
                    <Form.Item key="zt" label="状态" >
                        {getFieldDecorator('zt', {
                            initialValue: currentItem.zt,
                        })(
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="a">已投票</Radio.Button>
                                <Radio.Button value="b">未投票</Radio.Button>
                             </Radio.Group>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
