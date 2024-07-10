import Signup from "../components/Login/signup";
import { RecoilRoot } from "recoil";
const signup = () => {
  return (
    <div>
      <RecoilRoot>
        <Signup />
      </RecoilRoot>
    </div>
  );
};

export default signup;
