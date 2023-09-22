// Import Donation model
const Donation = require('../models/donationModel');

const mongoose = require('mongoose');

// GET all Donations
const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find({}).sort({ donationDate: -1 });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET a single Donation
const getDonation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Donation" });
    }

    try {
        const donation = await Donation.findById(id).populate('user charity');
        
        if (!donation) {
            return res.status(404).json({ error: "No such Donation" });
        }

        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST (create) a new Donation
const createDonation = async (req, res) => {
    const { donationAmount, charity } = req.body;

    const userId = req.user._id; // Assuming you have a user object in the request

    let emptyFields = [];

    if (!donationAmount) {
        emptyFields.push('donationAmount');
    }
    if (!charity) {
        emptyFields.push('charity');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `Please fill out ${emptyFields}`, emptyFields });
    }

    try {
        // Check if req.user is defined
        if (!req.user) {
          return res.status(401).json({ error: "User not authenticated" });
        }
    
        const userId = req.user._id;
        // Rest of your code for creating a donation
      } catch (error) {
        console.error("Error creating donation:", error);
        res.status(500).json({ error: "Internal server error" });
      }

    try {
        const donation = await Donation.create({ donationAmount, user: userId, charity });
        res.status(201).json(donation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE a Donation
const deleteDonation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Donation" });
    }

    try {
        const donation = await Donation.findOneAndDelete({ _id: id });

        if (!donation) {
            return res.status(404).json({ error: "No such Donation" });
        }

        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE a Donation
const updateDonation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Donation" });
    }

    try {
        const donation = await Donation.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        if (!donation) {
            return res.status(404).json({ error: "No such Donation" });
        }

        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDonation,
    getDonations,
    createDonation,
    deleteDonation,
    updateDonation
};
