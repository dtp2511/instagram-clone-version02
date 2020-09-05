import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

const Layout = ({ children, title, containerSize = "lg" }) => {
  useEffect(() => {
    document.title = `${title} | Instagram`;
    window.scrollTo(0, 0);
  }, [title]);
  return (
    <Box mt={4}>
      <Container maxWidth={containerSize}>{children}</Container>{" "}
    </Box>
  );
};

Layout.defaultProps = {
  title: "Welcome "
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Layout;
