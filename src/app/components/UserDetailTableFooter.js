import { App, Button } from "antd";

const UserDetailTableFooter = () => {
  const { modal } = App.useApp();
  const handleCreateButtonOnClick = (e) => {};

  return (
    <>
      <Button onClick={handleCreateButtonOnClick}>Create User</Button>
    </>
  );
};

export default UserDetailTableFooter;
