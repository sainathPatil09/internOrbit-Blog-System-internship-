import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      localStorage.setItem("jwt", data.token);
      //   setIsAuthenticated(true);
      //   setProfile(data);

      toast.success(data.message || "User Register Succesfully");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error("Please fill required fields");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div className="w-full max-w-md p-8 shadow-lg bg-white rounded-md">
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-xl items-center text-center">
              cilli<span className="text-blue-500">Blog</span>
            </div>

            <h1 className="font-semibold mb-6 text-xl">Register</h1>

            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              className="w-full p-2 rounded-md mb-4 border"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="mb-4">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your Name"
                value={name}
                className="w-full p-2 rounded-md border"
              />
            </div>
            <div className="mb-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your Email"
                value={email}
                className="w-full p-2 rounded-md border"
              />
            </div>
            <div className="mb-4">
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="Your Phone Number"
                value={phone}
                className="w-full p-2 rounded-md border"
              />
            </div>
            <div className="mb-4">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Your Password"
                value={password}
                className="w-full p-2 rounded-md border"
              />
            </div>

            <select
              onChange={(e) => setEducation(e.target.value)}
              value={education}
              className="w-full p-2 rounded-md mb-4 border"
            >
              <option value="">Select Education</option>
              <option value="B>E">B.E</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="other">other</option>
            </select>

            <div
              onChange={(e) => setPhoto(e.target.value)}
              className="flex items-center mb-4"
            >
              <div className="photo w-20 h-20 mr-4">
                <img
                  src={photoPreview ? `${photoPreview}` : "photo"}
                  alt="photo"
                />
              </div>
              <input
                onChange={changePhotoHandler}
                type="file"
                className="w-full p-2 rounded-md mb-4 border"
              />
            </div>

            <p className="text-center mb-4">
              Already Register?{" "}
              <Link to={"/login"} className="text-blue-500">
                Login Now
              </Link>
            </p>

            <button
              type="submit"
              className="w-full bg-blue-500 p-2 hover:bg-blue-700 duration-300 rounded-md  text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;