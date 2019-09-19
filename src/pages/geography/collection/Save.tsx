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
                title="编辑交叉口交通流信息"
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
                    <Form.Item key="fenceng" label="路口名称" >
                        {getFieldDecorator('remark', {
                            initialValue: currentItem.fenceng,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    
                    <Form.Item key="name" label="车道类型" >
                        {getFieldDecorator('name', {
                            initialValue: currentItem.name,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                   
                    <Form.Item key="leixing" label="进口道宽度" >
                        {getFieldDecorator('leixing', {
                            initialValue: currentItem.leixing,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jishu" label="状态" >
                        {getFieldDecorator('jishu', {
                            initialValue: currentItem.jishu,
                        })(
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="a">待规划</Radio.Button>
                                <Radio.Button value="b">已规划</Radio.Button>
                                <Radio.Button value="b">规划不通过</Radio.Button>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
