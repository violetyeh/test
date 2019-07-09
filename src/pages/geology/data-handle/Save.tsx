import { Component } from 'react';
import { Form, Modal, Input, message, Radio } from 'antd';
import React from 'react';
import styles from '../style.less';
import { FormComponentProps } from 'antd/lib/form';

interface SaveProps extends FormComponentProps {
  handleSaveVisible: () => void;
  currentItem: {};
}

interface SaveState { }
class Save extends Component<SaveProps, SaveState> {
  handleSave = () => {
    message.error('设备已离线，无法保存数据');
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const { form: { getFieldDecorator }, handleSaveVisible, currentItem } = this.props;
    return (
      <Modal
        title="编辑设备信息"
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}

      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item key="id" label="媒体设备编号" >
            {getFieldDecorator('id', {
              initialValue: currentItem.id,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="project" label="所属区域" >
            {getFieldDecorator('project', {
              initialValue: currentItem.project,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="creator" label="区域位置" >
            {getFieldDecorator('creator', {
              initialValue: currentItem.creator,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="type" label="发布类型" >
            {getFieldDecorator('type', {
              initialValue: currentItem.type,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="status" label="当前状态" >
            {getFieldDecorator('status', {
              initialValue: currentItem.status,
            })(
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">播放中</Radio.Button>
                <Radio.Button value="b">等待中</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create<SaveProps>()(Save);
