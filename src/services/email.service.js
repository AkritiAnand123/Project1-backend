const express = require("express");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp) => {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Your OTP for Event Registration",
            html: `<h2>Your OTP is: ${otp}</h2>`
        });

        console.log("Email sent ✅");
    } catch (err) {
        console.log("Email error:", err);
    }
};

module.exports = sendOTPEmail;