const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const generateOTP = require("../utils/generateOTP");
const sendOTPEmail = require("../services/email.service");

router.post("/register", async (req, res) => {
    console.log("API HIT");

    const { name, email } = req.body;

    //  Step 1: Check duplicate
    const { data: existingUser, error: fetchError } = await supabase
        .from("registrations")
        .select("id")
        .eq("leader_email", email);

    if (fetchError) {
        return res.status(400).json(fetchError);
    }

    if (existingUser.length > 0) {
        return res.status(400).json({
            message: "Email already registered "
        });
    }

    // Step 2: Generate OTP
    const otp = generateOTP();
    console.log("Generated OTP:", otp);

    // Step 3: Insert WITH OTP
    const { data, error } = await supabase
        .from("registrations")
        .insert([
            {
                leader_name: name,
                leader_email: email,
                otp: otp
            }
        ]);

    if (error) {
        console.log("ERROR:", error);
        return res.status(400).json(error);
    }

    // Step 4: Send email
    await sendOTPEmail(email, otp);

    //  Step 5: Final response (ONLY ONCE)
    res.json({
        message: "Registered successfully (Check your email)"
    });
});

module.exports = router;