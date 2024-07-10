import React, { useState } from "react";

interface URLFormValues {
  instagram: string;
  linkedin: string;
  other: string;
}

const UploadURL: React.FC = () => {
  const [formValues, setFormValues] = useState<URLFormValues>({
    instagram: "",
    linkedin: "",
    other: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Validate
      let count = 0;
      const arr = [formValues.instagram, formValues.linkedin, formValues.other];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") {
          count++;
        }
      }
      if (count > 1) {
        setErrorMessage("Please Submit atleast 2 urls");
        return;
      }
      if (!formValues.instagram.includes("https://instagram.com")) {
        console.log("Inside1");
        arr[0] = "https://instagram.com/" + arr[0];
        setFormValues((prevValues) => ({
          ...prevValues,
          instagram: "https://instagram.com/" + formValues.instagram,
        }));
      }
      if (!formValues.linkedin.includes("https://linkedin.com/in/")) {
        console.log("Inside");
        arr[1] = "https://linkedin.com/in/" + arr[1];
        setFormValues((prevValues) => ({
          ...prevValues,
          linkedin: "https://linkedin.com/in/" + formValues.linkedin,
        }));
      }
      //  API call

      setIsLoading(false);
      console.log(formValues, arr);
      setSuccessMessage("URLs submitted successfully!");
      setFormValues({ instagram: "", linkedin: "", other: "" });
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Failed to submit URLs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl p-16  rounded-lg shadow-2xl">
      <h2 className="mb-6 text-3xl font-bold text-center ">Upload Your URLs</h2>
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="instagram"
            className="block mb-1 text-sm font-medium text-gray-500"
          >
            Instagram Id
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={formValues.instagram}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm  "
            placeholder="yourprofile_5_xyz"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="linkedin"
            className="block mb-1 text-sm font-medium text-gray-500"
          >
            LinkedIn Id
          </label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={formValues.linkedin}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm  "
            placeholder="dhruvchandak30"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="other"
            className="block mb-1 text-sm font-medium text-gray-500"
          >
            Other URL
          </label>
          <input
            type="url"
            id="other"
            name="other"
            value={formValues.other}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm  "
            placeholder="https://dhruv-chandak.vercel.app"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          style={{ background: "linear-gradient(to right, #ff4b2b, #ff4160)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(to right, #ff4160, #ff4b2b)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(to right, #ff4b2b, #ff4160)")
          }
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}
      {successMessage && (
        <div className="mt-4 text-green-600 text-center">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="mt-4 text-center text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};

export default UploadURL;
