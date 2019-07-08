import { Component } from "react";
import React from "react";
import { Modal, message } from "antd";

interface DetailProps {
    handleDetailVisible: () => void;
}

interface DetailState {

}

class Detail extends Component<DetailProps, DetailState>{
    handleSave = () => {
        message.success('保存数据成功');
    }
    render() {
        const { handleDetailVisible } = this.props;
        return (
            <Modal
                visible
                onCancel={handleDetailVisible}
                onOk={this.handleSave}
            >
                数据分项
            </Modal>
        );
    }
}

export default Detail;
