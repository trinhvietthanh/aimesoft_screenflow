import React, { useState, useEffect} from "react";
import { Modal, Form, Input } from "antd";

function ModalEdit(modal) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [staff, setStaff] = useState({});
  useEffect(() => {
    setVisible(modal.modal);
    setStaff(modal.data);
    form.setFieldsValue(modal.data);
  });

  const onEdit = () => {
    modal.onSubmit(staff);
  };
  const handleChange = (e) => {
    let { _id, value } = e.target;

    const activeItem = { ...staff, [_id]: value };
    setStaff(activeItem);
    console.log(staff);
  };

  return (
    <>
      <Modal
        visible={visible}
        title="Sửa dữ liệu"
        okText="Lưu"
        onOk={onEdit}
        cancelText="Quay lại"
        onCancel={() => {
          modal.onCancel(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" initialValues={staff}>
          <Form.Item
            label="Tên nhân viên"
            name="displayName"
            onChange={handleChange}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="birth" onChange={handleChange}>
            <Input />
          </Form.Item>

          <Form.Item name="position" label="Vị trí" onChange={handleChange}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
// class ModalEdit extends React.Component{
//   constructor(props)
//   {
//     super(props);
//     this.state={
//       visible : false,
//       data : {}
//     };
//   }
//   UNSAFE_componentWillReceiveProps = (nextProps) => {
//     this.setState({ visible: nextProps.modal, data:nextProps.data });
//   };
//handleChange = (e) => {
//         let { _id, value } = e.target;

//         if (e.target.type === "checkbox") {
//           value = e.target.checked;
//         }
//         const activeItem = { ...this.state.data, [_id]: value };
//         this.setState({ data: activeItem});

//       };
//   render() {

//   }
// }
export default ModalEdit;
