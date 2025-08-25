import type { Scenario } from "@/types"

export const mockScenarios: Scenario[] = [
  {
    id: "s1-email-payroll",
    type: "email",
    title: "Payroll Update Required",
    difficulty: 2,
    points: 100,
    fromName: "HR Payroll",
    fromAddress: "updates@secure-hr-pay.com",
    subject: "ACTION REQUIRED: Verify Your Payroll Information",
    bodyHtml: `<p>Dear Employee,</p>
    <p>Our records indicate your payroll information may be out of date. To ensure no interruption in your next payment, please verify your details immediately via our secure portal.</p>
    <p>Failure to do so within 24 hours may result in a delay.</p>
    <p><a href="http://hr.secure-pay.co/verify" style="color: #0066cc; text-decoration: underline;">Click Here to Verify</a></p>
    <p>Thank you,<br/>HR Department</p>`,
    linkUrl: "http://phishguard-fake-login.vercel.app/",
    phishSignalHints: ["Sense of Urgency", "Generic Salutation", "Suspicious Link Domain", "Non-HTTPS Link"],
    answerKey: {
      isPhish: true,
      redFlags: [
        "The link goes to 'secure-pay.co', a lookalike domain.",
        "The urgent 24-hour deadline is a common tactic.",
        "The email uses a generic 'Dear Employee' greeting.",
      ],
    },
  },
  {
    id: "s2-email-legit",
    type: "email",
    title: "Legitimate Security Alert",
    difficulty: 1,
    points: 50,
    fromName: "Google",
    fromAddress: "no-reply@accounts.google.com",
    subject: "Security alert: New sign-in from Linux",
    bodyHtml: `<p>Hi [Your Name],</p>
    <p>Your Google Account was just signed into from a new Linux device. If this was you, you can safely ignore this email.</p>
    <p>If this wasn't you, please check your activity.</p>
    <p><a href="https://myaccount.google.com/device-activity" style="color: #0066cc; text-decoration: underline;">Check activity</a></p>`,
    linkUrl: "https://myaccount.google.com/device-activity",
    phishSignalHints: [],
    answerKey: {
      isPhish: false,
      redFlags: [
        "This is a legitimate email. The sender address is correct, and the link points to the official Google domain.",
      ],
    },
  },
  {
    id: "s3-sms-delivery",
    type: "sms",
    title: "Package Delivery SMS",
    difficulty: 2,
    points: 100,
    smsText:
      "FedEx: Your package #8123-AX is pending. An incorrect address was provided. Please update your shipping details here: https://fedex-tracking.info",
    linkUrl: "http://phishguard-fake-form.vercel.app/",
    phishSignalHints: ["Unsolicited Message", "Suspicious Link", "Request for Information"],
    answerKey: {
      isPhish: true,
      redFlags: [
        "The URL 'fedex-tracking.info' is not the official FedEx domain.",
        "Legitimate delivery companies rarely ask for full detail updates via SMS links.",
      ],
    },
  },
  {
    id: "s4-sms-upi-scam",
    type: "sms",
    title: "UPI Cashback Scam",
    difficulty: 3,
    points: 150,
    smsText:
      "Congratulations! You have won a cashback of ₹5,000. To receive the amount in your bank account, please approve the UPI request and enter your PIN.",
    linkUrl: "http://phishguard-fake-upi-request.vercel.app/",
    phishSignalHints: ["Requesting PIN for credit", "Too good to be true", "Unsolicited reward"],
    answerKey: {
      isPhish: true,
      redFlags: [
        "You never need to enter your UPI PIN to *receive* money.",
        "Unsolicited messages promising large rewards are a major red flag.",
      ],
    },
  },
  {
    id: "s5-email-aadhaar-update",
    type: "email",
    title: "Aadhaar KYC Update",
    difficulty: 3,
    points: 150,
    fromName: "UIDAI Support",
    fromAddress: "support@uidai-gov.in.net",
    subject: "Mandatory: Update your Aadhaar KYC",
    bodyHtml: `<p>Dear Citizen,</p>
    <p>As per new government regulations, you are required to update your Aadhaar KYC details. Please click the link below to upload your documents.</p>
    <p><a href="http://uidai-gov.in.net/update" style="color: #0066cc; text-decoration: underline;">Update Now</a></p>`,
    linkUrl: "http://phishguard-fake-doc-upload.vercel.app/",
    phishSignalHints: ["Incorrect domain", "Sense of urgency", "Request for sensitive documents"],
    answerKey: {
      isPhish: true,
      redFlags: [
        "The official UIDAI domain is 'uidai.gov.in'. The sender's domain is a fake lookalike.",
        "Government bodies rarely send such critical links via unsolicited emails.",
      ],
    },
  },
]
