const React = require("react");

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
        data-name="BMC-Widget"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="dmp"
        data-description="Support me on Buy me a coffee!"
        data-message="Thank you for visiting. You can now buy me a coffee!"
        data-color="#eaeaea"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
    ></script>,
  ]);
};