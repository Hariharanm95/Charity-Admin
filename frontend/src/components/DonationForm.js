import React, { useState, useEffect } from "react";
import { useDonationsContext } from "../hooks/useDonationsContext";

const DonationForm = () => {
    const { dispatch } = useDonationsContext();

    const [donationAmount, setDonationAmount] = useState("");
    const [selectedUser, setSelectedUser] = useState(""); // Updated: Use selectedUser state
    const [selectedCharity, setSelectedCharity] = useState(""); // Updated: Use selectedCharity state
    const [users, setUsers] = useState([]); // Updated: State to store the list of users
    const [charities, setCharities] = useState([]); // Updated: State to store the list of charities
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the list of users and charities when the component mounts
        fetch("/api/donations")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));

        fetch("/api/donations")
            .then((response) => response.json())
            .then((data) => setCharities(data))
            .catch((error) => console.error("Error fetching charities:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const donation = {
            donationAmount,
            user: selectedUser, // Updated: Use selectedUser
            charity: selectedCharity, // Updated: Use selectedCharity
        };

        const response = await fetch("/api/donations/", {
            method: "POST",
            body: JSON.stringify(donation),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setDonationAmount("");
            setSelectedUser(""); // Updated: Clear selectedUser
            setSelectedCharity(""); // Updated: Clear selectedCharity
            setError(null);
            console.log("new donation added", json);
            dispatch({ type: "CREATE_DONATION", payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Donation</h3>

            <label>Donation Amount:</label>
            <input
                type="number"
                onChange={(e) => setDonationAmount(e.target.value)}
                value={donationAmount}
            />

            <label>User:</label>
            <select
                onChange={(e) => setSelectedUser(e.target.value)}
                value={selectedUser}
            >
                <option value="">Select a User</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.username}
                    </option>
                ))}
            </select>

            {/* <label>Charity:</label>
            <select
                onChange={(e) => setSelectedCharity(e.target.value)}
                value={selectedCharity}
            >
                <option value="">Select a Charity</option>
                {charities.map((charity) => (
                    <option key={charity._id} value={charity._id}>
                        {charity.name}
                    </option>
                ))}
            </select> */}

            <button>Add Donation</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default DonationForm;
