// const express = require("express");
const path = require('path');

function generateOTP() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

module.exports = generateOTP;