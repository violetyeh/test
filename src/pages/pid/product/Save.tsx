import { Component } from 'react';
import { Form, Modal, Input, message, Radio, Select } from 'antd';
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
        title="添加产品"
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}
      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item key="name" label="产品名称">
            <Input placeholder="请输入产品名称" />
          </Form.Item>
          <Form.Item key="jianjie" label="产品简介">
            <Input placeholder="请输入产品简介" />
          </Form.Item>
          <Form.Item key="jianjie" label="产品类别">
            <Select >
              <Select.Option value="jack">护肤品</Select.Option>
              <Select.Option value="lucy">化妆品</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item key="experis" label="检测程序">
            <Select  >
              <Select.Option value="jack">BBS-PROGRAM</Select.Option>
              <Select.Option value="lucy">CCS-PROGRAM</Select.Option>
              <Select.Option value="disabled" >
                KH-PROGRAM
              </Select.Option>
              <Select.Option value="Yiminghe">FDY-PROGRAM</Select.Option>
            </Select>
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
