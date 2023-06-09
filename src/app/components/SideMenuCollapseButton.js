import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React from "react";
import { toggleCollapseSideMenu } from "../../redux/store";
import { connect, useDispatch } from "react-redux";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";

const SideMenuCollapseButton = ({ sideMenuCollapsed }) => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const handleToggleClick = () => {
    dispatch(toggleCollapseSideMenu());
  };
  return (
    <Button
      type="text"
      icon={sideMenuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={handleToggleClick}
      className={classes.mainPageSideMenuCollapseButton}
    />
  );
};

SideMenuCollapseButton.prototype = {
  sideMenuCollapsed: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    sideMenuCollapsed: state.layout.sideMenuCollapsed,
  };
}

export default connect(mapStateToProps)(SideMenuCollapseButton);

export const useStyle = createUseStyles({
  mainPageSideMenuCollapseButton: {
    fontSize: "16px",
    width: 64,
    height: 64,
  },
});
