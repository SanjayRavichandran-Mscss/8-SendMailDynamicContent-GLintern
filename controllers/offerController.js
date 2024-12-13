const pool = require('../config/db');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendOfferLetter = async (req, res) => {
  const { candidate_name, email, position, company, salary, joining_date, location } = req.body;

  try {
    // Insert data into the database
    const [result] = await pool.query(
      'INSERT INTO offer_details (candidate_name, email, position, company, salary, joining_date, location) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [candidate_name, email, position, company, salary, joining_date, location]
    );

    // Read the email template
    const templatePath = path.join(__dirname, '../templates/emailTemplate.html');
    let emailTemplate = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders with dynamic data
    emailTemplate = emailTemplate
      .replace('{{candidate_name}}', candidate_name)
      .replace('{{position}}', position)
      .replace('{{position}}', position)
      .replace('{{company}}', company)
      .replace('{{salary}}', salary)
      .replace('{{joining_date}}', joining_date)
      .replace('{{location}}', location);

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Offer Letter from ${company}`,
      html: emailTemplate,
    });

    res.status(200).json({ message: 'Offer letter sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending offer letter', error: error.message });
  }
};

module.exports = { sendOfferLetter };
