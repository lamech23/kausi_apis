const nodemailer = require("nodemailer");


const lease = async(tenant) => {
 
    const companyName = "Freyton Property Agencies";
    const companyAddress = "531 Main Street, Nairobi, Ruai";
    const companyPhone = "+123 456 7890";
    const companyEmail = "info@freatonproperty.com";
    const companyLogoUrl = "https://example.com/logo.png";
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "lamechcruze@gmail.com",
            pass: "fdbmegjxghvigklv",
        },
    });

    const mailOptions = {
        to: tenant.email,
        subject: "Lease Agreement ",
        html: `
        <div style="border-style: solid; border-color: #4CAF50; font-family: sans-serif; max-width: 42rem; margin-left: auto; margin-right: auto; padding: 2rem;">
        <img src="${companyLogoUrl}" alt="${companyName}" style="display: block; margin-left: auto; margin-right: auto; max-width: 20rem; margin-bottom: 2rem;">
        <h2 style="text-align: center; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; color: #4CAF50;">Lease Agreement</h2>
        <p style="text-align: left;">Hello <span style="font-weight: bold; color: #1E88E5;">${tenant.tenantsName}</span>,</p>
        <p style="text-align: left;">Congratulations! You have been successfully registered as a tenant for:</p>
        <p style="font-weight: bold; text-align: left; color: #1E88E5;">Property: ${tenant.houseName}, ${tenant.houseNumber}</p>
        
        <div style="display: flex; flex-direction: column; flex-wrap: wrap;">
            <div style="flex-basis: 50%; padding-right: 1rem; margin-bottom: 1rem; color: #FF5677;">
                <strong>Monthly Rent:</strong> $${tenant.rent}
            </div>
            <div style="flex-basis: 50%; padding-right: 1rem; margin-bottom: 1rem; color: #FF5677;">
                <strong>Rent Deposit:</strong> $${tenant.rentDeposit}
            </div>
            <div style="flex-basis: 50%; padding-right: 1rem; margin-bottom: 1rem; color: #FF5677;">
                <strong>Water Reading:</strong> ${tenant.waterReading}
            </div>
            <div style="flex-basis: 50%; padding-right: 1rem; margin-bottom: 1rem; color: #FF5677;">
                <strong>Water Bill:</strong> $${tenant.waterBill}
            </div>
            <div style="flex-basis: 50%; padding-right: 1rem; margin-bottom: 1rem; color: #FF5677;">
                <strong>Garbage Fee:</strong> $${tenant.garbage}
            </div>
            <div style="flex-basis: 50%; padding-right: 1rem; margin-bottom: 1rem; color: #FF5677;">
                <strong>Rent Payment Date:</strong> ${tenant.rentPaymentDate}
            </div>
            <div style="flex-basis: 50%; padding-right: 1rem; margin-bottom: 1rem; color: #FF5677;">
                <strong>Previous Balance:</strong> KSH ${tenant.previousBalance}
            </div>
            <div style="flex-basis: 50%; padding-right: 1rem; margin-bottom: 1rem; color: #FF5677;">
                <strong>Phone Number:</strong> ${tenant.phoneNumber}
            </div>
            <div style="flex-basis: 50%; padding-right: 1rem; margin-bottom: 1rem; color: #FF5677;">
                <strong>Next of Kin Number:</strong> ${tenant.nextOfKingNumber}
            </div>
            <div style="flex-basis: 50%; padding-right: 1rem; margin-bottom: 1rem; color: #FF5677;">
                <strong>Previous Readings:</strong> ${tenant.prevReadings}
            </div>
            <div style="flex-basis: 50%; padding-right: 1rem; margin-bottom: 1rem; color: #FF5677;">
                <strong>Payable Rent:</strong> $${tenant.payableRent}
            </div>
        </div>
        
        <p style="margin-top: 2rem;">Please review the lease terms carefully. If you have any questions or concerns, feel free to contact us.</p>
        <hr style="margin-top: 2rem; margin-bottom: 2rem; border: none; border-top: 1px solid #4CAF50;">
        <p style="text-align: center;">For any inquiries, please contact:</p>
        <p style="text-align: center; font-weight: bold; color: #1E88E5;">${companyName}</p>
        <p style="text-align: center; color: #1E88E5;">${companyAddress}</p>
        <p style="text-align: center; color: #1E88E5;">Phone: ${companyPhone} | Email: ${companyEmail}</p>
        </div>
        `,
    };

   await transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.log("There was an error", err);
        } else {
            console.log("Email sent:", response);
        }
    });
    
};

module.exports = {lease}
