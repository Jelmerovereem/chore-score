import { loginBtn } from "./utils/loginUtils.js";
import login from "./modules/login.js";
import { imgInput, uploadBtn } from "./utils/profileUtils.js";
import changePic from "./modules/uploadImg.js";

if (loginBtn) loginBtn.addEventListener("click", login);

if (uploadBtn && changePic) uploadBtn.addEventListener("click", changePic);