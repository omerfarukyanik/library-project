import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../utils";

const ErrorPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleBackHome = () => {
    if (isUserLoggedIn()) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle={t("status.404")}
      extra={
        <Button type="primary" onClick={handleBackHome}>
          {t("back.home")}
        </Button>
      }
    />
  );
};
export default ErrorPage;
