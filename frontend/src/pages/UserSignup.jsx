import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
    // State initialization
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // userData is unused; you can remove it if not needed
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    // Context for global user state
    const { setUser } = useContext(UserDataContext);

    // Handler for form submission
    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/register`,
                newUser
            );

            // Save data if available
            const data = response.data;
            if (data?.user) setUser(data.user);
            if (data?.token) localStorage.setItem("token", data.token);
        } catch (error) {
            // Handle errors but still navigate
            const errorMessage = error.response
                ? error.response.data.message || "Signup failed. Check your credentials."
                : "Network error. Server might be down.";
            console.error("Signup Error:", errorMessage);
            alert(errorMessage);
        } finally {
            // ✅ Always navigate (success OR failure)
            navigate("/home");
        }

        // Clear input fields
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
    };

    return (
        <div>
            <div className="p-7 h-screen flex flex-col justify-between">
                <div>
                    <img
                        className="w-16 mb-10"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
                        alt="Logo"
                    />

                    <form onSubmit={submitHandler}>
                        <h3 className="text-lg w-1/2 font-medium mb-2">
                            What's your name
                        </h3>
                        <div className="flex gap-4 mb-7">
                            <input
                                required
                                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                required
                                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <h3 className="text-lg font-medium mb-2">What's your email</h3>
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                            type="email"
                            placeholder="email@example.com"
                        />

                        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                        <input
                            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            placeholder="password"
                        />

                        <button
                            type="submit"
                            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
                        >
                            Create account
                        </button>
                    </form>

                    <p className="text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600">
                            Login here
                        </Link>
                    </p>
                </div>

                <div>
                    <p className="text-[10px] leading-tight">
                        This site is protected by reCAPTCHA and the{" "}
                        <span className="underline">Google Privacy Policy</span> and{" "}
                        <span className="underline">Terms of Service apply</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserSignup;
