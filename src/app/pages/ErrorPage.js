import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={t("status.404")}
      extra={
        <Button type="primary" onClick={() => navigate("/home")}>
          {t("back.home")}
        </Button>
      }
    />
  );
};
export default ErrorPage;
