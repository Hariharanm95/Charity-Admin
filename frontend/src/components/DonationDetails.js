import { useDonationsContext } from "../hooks/useDonationsContext";
// import { formatDistanceToNow } from "date-fns";


const DonationDetails = ({ donation }) => {
    const { dispatch } = useDonationsContext();
    
    console.log(donation);
    const handleClick = async () => {
        const response = await fetch("/api/donations/" + donation._id, {
            method: "DELETE",
        });
        
        if (response.ok) {
            dispatch({ type: "DELETE_DONATION", payload: donation._id });
        }
    };

    // Check if donation is defined
    if (!donation) {
        return null; // Render nothing if donation is undefined
    }

    return (
        <div className="donation-details">
            <h4>{donation.username}</h4>
            {/* <p><strong>username:</strong> {donation.username}</p> */}
            <p><strong>email:</strong> {donation.email}</p>
            {/* <p><strong>password:</strong> {donation.password}</p> */}
            {/* <p><strong>Charity:</strong> {donation[donation.charities]}</p> */}
            {/* <p>{formatDistanceToNow(new Date(donation.donationDate), { addSuffix: true })}</p> */}
            <span className="material-symbols-outlined" onClick={handleClick}>
                Delete
            </span>
        </div>
    );
};


export default DonationDetails;
