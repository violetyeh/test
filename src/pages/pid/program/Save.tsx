import { Component } from 'react';
import { Form, Modal, Input, message, Radio } from 'antd';
import React from 'react';
import styles from '../style.less';

interface SaveProps {
  handleSaveVisible: () => void;
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

    const { handleSaveVisible } = this.props;
    return (
      <Modal
        title="增加计量程序"
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}
      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item key="name" label="程序名称">
            <Input placeholder="请输入程序名称" />
          </Form.Item>
          <Form.Item key="jianjie" label="程序简介">
            <Input placeholder="请输入程序简介" />
          </Form.Item>
          <Form.Item key="jianjie" label="程序代码">
            <Input.TextArea rows={8} placeholder="import { Component } from 'react';
import { Form, Modal, Input, message, Radio } from 'antd';
import React from 'react';
import styles from '../style.less';

interface SaveProps {
  handleSaveVisible: () => void;
}

interface SaveState { }
class Save extends Component<SaveProps, SaveState> {
}" />
          </Form.Item>
          <Form.Item key="experis" label="加工类别">
            <Input placeholder="请输入加工类别" />
          </Form.Item>
          <Form.Item key="review" label="加工元素">
            <Input placeholder="请输入加工元素" />
          </Form.Item>
          <Form.Item key="remark" label="备注">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Save;
