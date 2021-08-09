import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { recaptchKey } from "../../config/config";

const Captcha = (props, ref) => {
  return <ReCAPTCHA ref={ref} sitekey={recaptchKey} theme="dark" {...props} />;
};

export default forwardRef(Captcha);
