const express = require('express');

// Import DonationController
const {
    createDonation,
    getDonation,
    getDonations,
    deleteDonation,
    updateDonation
} = require("../controllers/donationController");

const router = express.Router();

// GET all Donations
router.get('/', getDonations);

// GET a single Donation
router.get('/:id', getDonation);

// POST a new Donation
router.post('/', createDonation);

// DELETE a Donation
router.delete('/:id', deleteDonation);

// UPDATE a Donation
router.patch('/:id', updateDonation);

module.exports = router;
