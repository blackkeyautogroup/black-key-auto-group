import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      selectedYear,
      selectedMake,
      selectedModel,
      budget,
      mileage,
      color,
      fullName,
      phone,
      email,
      zipCode,
      details,
      downPayment,
estimatedCredit,
targetPayment,
negativeEquity,
purchaseType,
leaseVehiclePrice,
leaseMonths,
leaseMileage,
financeMonths,
specialCarName,
specialCarPrice,
    } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Black Key Website <onboarding@resend.dev>",
      to: ["blackkeyautogroup33@gmail.com"],
      subject: `New Vehicle Request - ${selectedMake} ${selectedModel}`,

      html: `
        <h2>New Vehicle Request</h2>

      ${
  specialCarName
    ? `
      <p><strong>Special Car:</strong> ${specialCarName}</p>
      <p><strong>Price:</strong> $${specialCarPrice || "Not provided"}</p>
    `
    : `
      <p><strong>Year:</strong> ${selectedYear}</p>
      <p><strong>Make:</strong> ${selectedMake}</p>
      <p><strong>Model:</strong> ${selectedModel}</p>
    `
}

      ${
  purchaseType === "finance"
    ? `<p><strong>Budget:</strong> $${budget || "Not provided"}</p>`
    : ""
}

        <p><strong>Max Monthly Mileage:</strong> ${mileage}</p>
        <p><strong>Preferred Color:</strong> ${color}</p>

        <hr />

        <h3>Customer Information</h3>

        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>ZIP Code:</strong> ${zipCode}</p>

        <hr />

${
  specialCarName
    ? `
      <h3>Purchase Information</h3>
      <p><strong>Purchase Type:</strong> ${purchaseType || "Not selected"}</p>
    `
    : `
      <h3>Financing Information</h3>

      <p><strong>Down Payment:</strong> $${downPayment || "Not provided"}</p>
      <p><strong>Estimated Credit:</strong> ${estimatedCredit || "Not provided"}</p>
      <p><strong>Target Payment:</strong> $${targetPayment || "Not provided"}</p>
      <p><strong>Negative Equity / If Any:</strong> $${negativeEquity || "0"}</p>
      <p><strong>Purchase Type:</strong> ${purchaseType || "Not selected"}</p>

      ${
        purchaseType === "finance"
          ? `<p><strong>Finance Term:</strong> ${
              financeMonths || "Not selected"
            } Months</p>`
          : ""
      }

      ${
        purchaseType === "lease"
          ? `
            <p><strong>Vehicle Price:</strong> $${
              leaseVehiclePrice || "Not provided"
            }</p>
            <p><strong>Lease Term:</strong> ${
              leaseMonths || "Not selected"
            } Months</p>
            <p><strong>Annual Mileage:</strong> ${
              leaseMileage || "Not selected"
            } Miles</p>
          `
          : ""
      }
    `
}
<hr />

        <p><strong>Additional Details:</strong></p>
        <p>${details || "None"}</p>
      `,
    });

    if (error) {
      console.error(error);

      return NextResponse.json(
        { success: false, error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to send request" },
      { status: 500 }
    );
  }
}