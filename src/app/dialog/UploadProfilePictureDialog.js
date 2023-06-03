import { Button, Modal } from "antd";
import { useState } from "react";
import { createUseStyles } from "react-jss";
const UploadProfilePictureDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Upload
      </Button>
      <Modal
        title="Upload Profile Picture"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
};
export default UploadProfilePictureDialog;

const useStyles = createUseStyles({
  avatarUploader: {
    "& ant-upload": {
      width: "128px",
      height: "128px",
    },
  },
});
