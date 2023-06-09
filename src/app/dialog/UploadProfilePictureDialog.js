import { Button, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { beforeUpload } from "../utils";
import { useUploadProfilePictureMutation } from "../../redux/api/layoutApi";
import { BACKEND_HOSTNAME } from "../../env";

const UploadProfilePictureDialog = ({ preferredLanguage }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadRequest, { isError, isLoading, isSuccess, isUninitialized }] =
    useUploadProfilePictureMutation({});

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [progress, setProgress] = useState(0);
  const handleChange = (info) => {
    console.log(info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const customUploadImageRequest = async (options) => {
    console.log(options);
    const { onSuccess, onError, file, onProgress } = options;
    const formData = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    console.log(config);
    formData.append("file", file);
    try {
      const response = uploadRequest({
        requestBody: formData,
        headers: config.headers,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
      onError({ err });
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t("upload")}
      </Button>
      <Modal
        title={t("upload.profile.picture")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("ok")}
        cancelText={t("cancel")}
      >
        <ImgCrop rotationSlider>
          <Upload
            action={BACKEND_HOSTNAME + "/upload-profile-picture"}
            maxCount={1}
            accept={"image/png, image/jpeg"}
            name="profile_picture"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            //customRequest={customUploadImageRequest}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </ImgCrop>
      </Modal>
    </>
  );
};

UploadProfilePictureDialog.prototype = {
  preferredLanguage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    preferredLanguage: state.layout.preferredLanguage,
  };
}

export default connect(mapStateToProps)(UploadProfilePictureDialog);

const useStyles = createUseStyles({
  avatarUploader: {
    width: "250px",
    height: "250px",
  },
});
