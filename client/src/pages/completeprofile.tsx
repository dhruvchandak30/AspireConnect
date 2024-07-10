import ProfilePicture from "../components/Login/ProfilePicture";
import UploadURL from "../components/Login/UploadURL";

const Completeprofile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
      <div>
        <ProfilePicture />
      </div>
      <div>
        <UploadURL />
      </div>
    </div>
  );
};

export default Completeprofile;
