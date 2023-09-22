import { DonationsContext } from "../context/DonationContext";
import { useContext } from "react";

export const useDonationsContext = () => {
    const context = useContext(DonationsContext);

    if (!context) {
        throw new Error("useDonationsContext must be used inside a DonationsContextProvider");
    }

    return context;
};
