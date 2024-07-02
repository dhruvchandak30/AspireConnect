import React from "react";
import profileImage from "../../assets/profile.jpg";
import linkedinLogo from "../../assets/LinkedInLogo.png";
import githubLogo from "../../assets/GithubLogo.png";
import websiteLogo from "../../assets/website.png";
import gmailLogo from "../../assets/gmail.png";

const ContactUs: React.FC = () => {
  const email = "dhruvchandak5@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/dhruvchandak30";
  const websiteUrl = "https://dhruv-chandak.vercel.app";
  const githubUrl = "https://github.com/dhruvchandak30";
  const profileName = "Dhruv Chandak";
  const domain = "Software Engineer";

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-full w-32 h-32 mb-4"
          />
          <h2 className="text-3xl font-bold mb-2">{profileName}</h2>
          <p className="text-gray-600 mb-4">{domain}</p>
          <div className="mb-4 flex items-center space-x-4">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <img src={linkedinLogo} alt="LinkedIn" className="w-8 h-8 mr-2" />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <img src={githubLogo} alt="GitHub" className="w-8 h-8 mr-2" />
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center text-blue-600 hover:underline"
            >
              <img src={gmailLogo} alt="Gmail" className="w-8 h-8 mr-2" />
            </a>
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <img src={websiteLogo} alt="Website" className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
