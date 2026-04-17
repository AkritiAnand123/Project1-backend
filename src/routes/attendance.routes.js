// const express = require("express");
// const router = express.Router();
// const supabase = require("../config/supabase");

// router.post("/verify-otp", async (req, res) => {
//     const { email, otp } = req.body;

//     // 🔹 Step 1: Find user by email
//     const { data, error } = await supabase
//         .from("registrations")
//         .select("*")
//         .eq("leader_email", email)
//         .single();

//     if (error || !data) {
//         return res.status(404).json({
//             message: "User not found ❌"
//         });
//     }

//     // 🔹 Step 2: Check OTP
//     if (data.otp !== otp) {
//         return res.status(400).json({
//             message: "Invalid OTP ❌"
//         });
//     }

//     // 🔹 Step 3: Success
//     res.json({
//         message: "OTP verified successfully ✅",
//         name: data.leader_name
//     });
// });

// // 🔹 Step 4: Mark as verified
// const { error: updateError } = await supabase
//     .from("registrations")
//     .update({ is_verified: true })
//     .eq("leader_email", email);

// if (updateError) {
//     return res.status(400).json(updateError);
// }
// res.json({
//     message: "OTP verified successfully ✅"
// });


// module.exports = router;

const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    // 🔹 Step 1: Find user
    const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("leader_email", email)
        .maybeSingle();

    if (error || !data) {
        return res.status(404).json({
            message: "User not found ❌"
        });
    }

    // 🔹 Step 2: Check OTP
    if (data.otp !== otp) {
        return res.status(400).json({
            message: "Invalid OTP ❌"
        });
    }

    // 🔹 Step 3: Mark verified ✅ (INSIDE route)
    const { error: updateError } = await supabase
        .from("registrations")
        .update({ is_verified: true, otp: null })
        .eq("leader_email", email);

    if (updateError) {
        return res.status(400).json(updateError);
    }

    // 🔹 Step 4: Final response (ONLY ONCE)
    res.json({
        message: "OTP verified successfully ✅",
        name: data.leader_name
    });
});

module.exports = router;