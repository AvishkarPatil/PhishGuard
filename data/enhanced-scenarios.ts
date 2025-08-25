import type { EnhancedScenario } from "@/types"

export const enhancedScenarios: EnhancedScenario[] = [
  {
    id: "upi-payment-scam-advanced",
    type: "sms",
    title: "UPI Payment Scam Investigation",
    difficulty: 3,
    points: 300,
    category: "upi",
    region: "india",
    estimatedTime: 15,
    tags: ["upi", "payment", "social-engineering", "advanced"],
    smsText: "ALERT: Congratulations! You've received ₹5,000 from Google Pay. Enter your UPI PIN to claim: https://googlepay-claim.co.in/verify",
    linkUrl: "https://googlepay-claim.co.in/verify",
    phishSignalHints: ["Fake reward", "PIN request for receiving", "Suspicious domain", "Too good to be true"],
    answerKey: {
      isPhish: true,
      redFlags: [
        "You NEVER need UPI PIN to receive money",
        "Domain 'googlepay-claim.co.in' is fake (real: pay.google.com)",
        "Unsolicited ₹5,000 reward is unrealistic",
        "Legitimate UPI transactions don't require PIN entry via SMS links"
      ],
    },
    steps: [
      {
        id: "intro",
        type: "intro",
        title: "UPI Scam Investigation Lab",
        content: "You've received a suspicious SMS claiming you've won ₹5,000 from Google Pay. As a cybersecurity analyst, you need to investigate this message using real-world techniques. This simulation mirrors actual scam patterns targeting 95% of Indian UPI users.",
        nextStepId: "initial-analysis",
      },
      {
        id: "initial-analysis",
        type: "lesson",
        title: "Message Forensics",
        content: "First, let's analyze the SMS structure. Real UPI notifications have specific patterns: they come from official short codes (like 'GPAY' or '56677'), never ask for PIN entry, and contain transaction IDs. This message lacks all these authentic markers.",
        nextStepId: "domain-investigation",
      },
      {
        id: "domain-investigation",
        type: "interactive",
        title: "Domain Analysis Lab",
        component: "browser",
        data: {
          url: "https://googlepay-claim.co.in/verify",
          title: "Google Pay Verification",
          content: "<div style='background: #4285f4; color: white; padding: 20px; text-align: center;'><h2>[REWARD] Congratulations!</h2><p>You've won ₹5,000!</p><form><input type='password' placeholder='Enter UPI PIN' style='padding: 10px; margin: 10px; border: none; border-radius: 5px;'><br><button style='background: #34a853; color: white; padding: 10px 20px; border: none; border-radius: 5px;'>Claim Now</button></form></div>",
        },
        nextStepId: "upi-mechanics-lesson",
      },
      {
        id: "upi-mechanics-lesson",
        type: "lesson",
        title: "UPI Security Mechanics",
        content: "Critical UPI Rule: Your PIN is ONLY for sending money, never for receiving. When someone sends you money, it appears automatically in your account. No PIN, no verification, no links to click. This fundamental principle is what scammers exploit.",
        nextStepId: "red-flags-quiz",
      },
      {
        id: "red-flags-quiz",
        type: "quiz",
        title: "Red Flag Identification",
        content: "Based on your investigation, identify the PRIMARY red flag that immediately reveals this as a scam:",
        options: [
          {
            id: "domain-suspicious",
            text: "The domain 'googlepay-claim.co.in' looks suspicious",
            isCorrect: false,
            explanation: "While the domain is fake, this requires technical knowledge to verify. The PIN request is the immediate giveaway."
          },
          {
            id: "pin-request",
            text: "Asking for UPI PIN to receive money",
            isCorrect: true,
            explanation: "✅ This is the #1 rule every Indian should know: NEVER enter PIN to receive money. This alone identifies any scam."
          },
          {
            id: "amount-large",
            text: "₹5,000 is too large an amount",
            isCorrect: false,
            explanation: "While suspicious, legitimate cashbacks can be substantial. The PIN request is the definitive red flag."
          }
        ],
        nextStepId: "technical-analysis",
      },
      {
        id: "technical-analysis",
        type: "lesson",
        title: "Technical Deep Dive",
        content: "Advanced Analysis: The fake domain uses '.co.in' to mimic legitimacy, but Google Pay's official domain is 'pay.google.com'. The WHOIS data would show recent registration, likely from a different country. The SSL certificate would be basic, not the Extended Validation used by real financial services.",
        nextStepId: "social-engineering-lesson",
      },
      {
        id: "social-engineering-lesson",
        type: "lesson",
        title: "Psychology of the Attack",
        content: "This scam exploits three psychological triggers: 1) Greed (free money), 2) Authority (Google Pay branding), 3) Urgency (claim now). Understanding these helps you recognize similar patterns across different scam types.",
        nextStepId: "final-assessment",
      },
      {
        id: "final-assessment",
        type: "quiz",
        title: "Final Security Assessment",
        content: "You receive a similar message claiming ₹2,000 from PhonePe. What's your FIRST action?",
        options: [
          {
            id: "check-app",
            text: "Open PhonePe app to check transaction history",
            isCorrect: true,
            explanation: "🎯 Always verify through the official app first. Real transactions appear there immediately."
          },
          {
            id: "click-link",
            text: "Click the link to investigate",
            isCorrect: false,
            explanation: "⚠️ Never click suspicious links. This could install malware or steal your data."
          },
          {
            id: "call-support",
            text: "Call customer support first",
            isCorrect: false,
            explanation: "While safe, checking the app is faster and more efficient for transaction verification."
          }
        ],
        nextStepId: "completion",
      },
      {
        id: "completion",
        type: "completion",
        title: "UPI Security Expert Certified!",
        content: "Outstanding! You've mastered UPI scam detection using professional cybersecurity techniques. You can now protect yourself and educate others about the #1 rule: Never enter PIN to receive money. You've earned the 'UPI Guardian' badge!",
      },
    ],
  },
  {
    id: "bank-security-alert-advanced",
    type: "email",
    title: "Banking Security Alert Investigation",
    difficulty: 4,
    points: 350,
    category: "banking",
    region: "india",
    estimatedTime: 12,
    tags: ["banking", "phishing", "social-engineering", "advanced"],
    fromName: "SBI Security Team",
    fromAddress: "security@sbi-online.co.in",
    subject: "[URGENT] Your SBI account has been temporarily suspended",
    bodyHtml: `<div style="font-family: Arial; padding: 20px; border: 2px solid #d32f2f;">
      <div style="background: #d32f2f; color: white; padding: 15px; margin: -20px -20px 20px -20px;">
        <h2>[OFFICIAL] State Bank of India - Security Alert</h2>
      </div>
      <p><strong>Dear Valued Customer,</strong></p>
      <p>We have detected suspicious activity on your SBI account ending in ****7892. For your security, we have temporarily suspended your account.</p>
      <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
        <strong>[WARNING] Action Required Within 24 Hours</strong><br>
        Failure to verify will result in permanent account closure.
      </div>
      <p>Please verify your identity immediately:</p>
      <a href="https://sbi-online.co.in/verify-account" style="background: #d32f2f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">[SECURE] Verify Account Now</a>
      <p><small>This is an automated security message from SBI.</small></p>
    </div>`,
    linkUrl: "https://sbi-online.co.in/verify-account",
    phishSignalHints: ["Fake urgency", "Generic greeting", "Suspicious domain", "Account suspension threat"],
    answerKey: {
      isPhish: true,
      redFlags: [
        "Domain 'sbi-online.co.in' is fake (real: onlinesbi.sbi)",
        "Banks never suspend accounts via email",
        "Generic greeting 'Dear Valued Customer'",
        "False urgency with 24-hour deadline"
      ],
    },
    steps: [
      {
        id: "intro",
        type: "intro",
        title: "Banking Phishing Investigation",
        content: "You've received an urgent email claiming your SBI account is suspended. As a cybersecurity professional, you'll analyze this using advanced techniques that banks actually use to train their security teams.",
        nextStepId: "email-headers",
      },
      {
        id: "email-headers",
        type: "lesson",
        title: "Email Header Analysis",
        content: "Professional Technique: Real bank emails have specific header signatures, SPF/DKIM authentication, and come from verified domains. This email would fail all these checks. The 'Return-Path' would show a different domain than claimed.",
        nextStepId: "domain-forensics",
      },
      {
        id: "domain-forensics",
        type: "interactive",
        title: "Domain Forensics Lab",
        component: "browser",
        data: {
          url: "https://sbi-online.co.in/verify-account",
          title: "SBI Account Verification",
          content: "<div style='background: #1976d2; color: white; padding: 20px;'><h2>[BANK] State Bank of India</h2><p>Account Verification Required</p><form style='background: white; color: black; padding: 20px; margin: 20px 0; border-radius: 5px;'><input type='text' placeholder='Account Number' style='width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ccc;'><input type='password' placeholder='Internet Banking Password' style='width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ccc;'><input type='password' placeholder='Transaction Password' style='width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ccc;'><button style='background: #1976d2; color: white; padding: 10px 20px; border: none; width: 100%;'>Verify Account</button></form></div>",
        },
        nextStepId: "banking-procedures",
      },
      {
        id: "banking-procedures",
        type: "lesson",
        title: "Real Banking Security Procedures",
        content: "Critical Knowledge: Banks NEVER suspend accounts via email. Real security alerts: 1) Appear in your banking app, 2) Require branch visit for resolution, 3) Never ask for passwords via email, 4) Use official domains only (onlinesbi.sbi for SBI).",
        nextStepId: "threat-assessment",
      },
      {
        id: "threat-assessment",
        type: "quiz",
        title: "Threat Level Assessment",
        content: "What makes this email particularly dangerous compared to obvious scams?",
        options: [
          {
            id: "looks-professional",
            text: "Professional appearance with bank branding",
            isCorrect: true,
            explanation: "✅ Sophisticated visual design makes users trust it. This is 'spear phishing' - targeted and convincing."
          },
          {
            id: "asks-money",
            text: "It asks for money directly",
            isCorrect: false,
            explanation: "This email doesn't ask for money - it's after your banking credentials, which is more valuable."
          },
          {
            id: "bad-grammar",
            text: "Poor grammar and spelling",
            isCorrect: false,
            explanation: "Actually, this email has good grammar, making it more convincing than obvious scams."
          }
        ],
        nextStepId: "verification-methods",
      },
      {
        id: "verification-methods",
        type: "lesson",
        title: "Professional Verification Techniques",
        content: "Advanced Security Protocol: 1) Check official domain (onlinesbi.sbi), 2) Log into banking app independently, 3) Call bank using number from official website/card, 4) Never use contact info from suspicious emails, 5) Report phishing to bank's cybercrime cell.",
        nextStepId: "final-challenge",
      },
      {
        id: "final-challenge",
        type: "quiz",
        title: "Expert Challenge",
        content: "You receive a similar email from 'HDFC Bank' with domain 'hdfcbank-security.com'. What's the FASTEST way to verify legitimacy?",
        options: [
          {
            id: "google-domain",
            text: "Google search the domain name",
            isCorrect: false,
            explanation: "While helpful, this takes time. The domain structure itself reveals it's fake."
          },
          {
            id: "check-domain-structure",
            text: "Analyze domain structure - real HDFC uses 'hdfcbank.com'",
            isCorrect: true,
            explanation: "🏆 Real banks use their exact brand name as domain. 'hdfcbank-security.com' is clearly fake."
          },
          {
            id: "call-bank",
            text: "Call the bank immediately",
            isCorrect: false,
            explanation: "Safe but slow. Domain analysis gives instant verification."
          }
        ],
        nextStepId: "completion",
      },
      {
        id: "completion",
        type: "completion",
        title: "Banking Security Expert Certified!",
        content: "Exceptional work! You've mastered advanced banking phishing detection using professional cybersecurity techniques. You can now identify sophisticated attacks that fool even experienced users. You've earned the 'Banking Guardian' badge!",
      },
    ],
  },
  {
    id: "job-offer-scam-advanced",
    type: "email",
    title: "Fake Job Offer Investigation",
    difficulty: 3,
    points: 250,
    category: "employment",
    region: "india",
    estimatedTime: 10,
    tags: ["job-scam", "social-engineering", "advance-fee"],
    fromName: "TCS HR Department",
    fromAddress: "hr@tcs-recruitment.com",
    subject: "[OFFER] Congratulations! TCS Job Offer - Software Engineer (₹15 LPA)",
    bodyHtml: `<div style="font-family: Arial; padding: 20px; background: #f8f9fa;">
      <div style="background: #0052cc; color: white; padding: 20px; text-align: center;">
        <h2>[COMPANY] Tata Consultancy Services</h2>
        <p>Leading Global IT Services Company</p>
      </div>
      <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3>[SELECTED] Congratulations! You've Been Selected</h3>
        <p><strong>Position:</strong> Software Engineer</p>
        <p><strong>Package:</strong> ₹15,00,000 per annum</p>
        <p><strong>Location:</strong> Bangalore, Mumbai, Chennai</p>
        <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <strong>[REQUIRED] Final Step Required:</strong><br>
          Pay refundable security deposit of ₹5,000 to confirm your position.
          This amount will be refunded with your first salary.
        </div>
        <p>Payment Details:</p>
        <p><strong>Account:</strong> TCS Recruitment Fund<br>
        <strong>UPI ID:</strong> tcs.recruitment@paytm</p>
        <a href="#" style="background: #0052cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">[PAYMENT] Pay Security Deposit</a>
      </div>
    </div>`,
    linkUrl: "https://tcs-recruitment.com/payment",
    phishSignalHints: ["Advance fee request", "Fake domain", "No interview process", "Too good to be true"],
    answerKey: {
      isPhish: true,
      redFlags: [
        "Legitimate companies NEVER ask for money from candidates",
        "Domain 'tcs-recruitment.com' is fake (real: tcs.com)",
        "No interview or selection process mentioned",
        "UPI ID 'tcs.recruitment@paytm' is unprofessional for a major corporation"
      ],
    },
    steps: [
      {
        id: "intro",
        type: "intro",
        title: "Employment Scam Investigation",
        content: "You've received a job offer from TCS without applying. This represents a growing threat targeting job seekers, especially fresh graduates. You'll analyze this using HR security protocols.",
        nextStepId: "recruitment-process",
      },
      {
        id: "recruitment-process",
        type: "lesson",
        title: "Legitimate Recruitment Process",
        content: "Real TCS Hiring: 1) Application through official portal, 2) Multiple interview rounds, 3) Technical assessments, 4) Background verification, 5) Offer letter with official letterhead. This email skips ALL these steps.",
        nextStepId: "advance-fee-analysis",
      },
      {
        id: "advance-fee-analysis",
        type: "lesson",
        title: "Advance Fee Fraud Analysis",
        content: "Classic 'Advance Fee Fraud': Scammers ask for upfront payment promising future benefits. The ₹5,000 'security deposit' is the hook. Once paid, they'll ask for more fees (visa processing, training, etc.) until you realize it's fake.",
        nextStepId: "domain-verification",
      },
      {
        id: "domain-verification",
        type: "interactive",
        title: "Corporate Domain Verification",
        component: "browser",
        data: {
          url: "https://tcs-recruitment.com",
          title: "TCS Recruitment Portal",
          content: "<div style='background: #0052cc; color: white; padding: 20px; text-align: center;'><h2>TCS Careers</h2><p>Join India's Leading IT Company</p><div style='background: white; color: black; padding: 20px; margin: 20px; border-radius: 5px;'><h3>Quick Hiring Process</h3><p>Get hired in 24 hours!</p><p>Just pay ₹5,000 processing fee</p><button style='background: #ff4444; color: white; padding: 15px 30px; border: none; border-radius: 5px;'>Pay Now & Get Job</button></div></div>",
        },
        nextStepId: "red-flags-quiz",
      },
      {
        id: "red-flags-quiz",
        type: "quiz",
        title: "Critical Red Flag Identification",
        content: "What's the BIGGEST red flag that immediately identifies this as a scam?",
        options: [
          {
            id: "no-interview",
            text: "No interview process mentioned",
            isCorrect: false,
            explanation: "Suspicious, but some companies do hire based on profiles. The money request is the definitive red flag."
          },
          {
            id: "money-request",
            text: "Asking candidates to pay money",
            isCorrect: true,
            explanation: "🎯 Golden Rule: Legitimate employers NEVER ask candidates for money. This applies globally."
          },
          {
            id: "high-salary",
            text: "₹15 LPA seems too high",
            isCorrect: false,
            explanation: "TCS does offer competitive packages. The money request, not the salary, reveals the scam."
          }
        ],
        nextStepId: "verification-protocol",
      },
      {
        id: "verification-protocol",
        type: "lesson",
        title: "Job Offer Verification Protocol",
        content: "Professional Verification: 1) Check company's official careers page, 2) Verify recruiter's LinkedIn profile, 3) Call company's main number (not from email), 4) Ask for offer letter on official letterhead, 5) Never pay any fees.",
        nextStepId: "final-assessment",
      },
      {
        id: "final-assessment",
        type: "quiz",
        title: "Expert Assessment",
        content: "You receive a similar offer from 'Infosys' asking for ₹3,000 'training fee'. What's your response?",
        options: [
          {
            id: "pay-small-amount",
            text: "Pay since ₹3,000 is small for Infosys job",
            isCorrect: false,
            explanation: "🚨 Amount doesn't matter. Real companies never charge candidates, regardless of amount."
          },
          {
            id: "verify-first",
            text: "Verify through official Infosys careers portal",
            isCorrect: true,
            explanation: "⭐ Always verify through official channels. Real offers appear in company systems."
          },
          {
            id: "negotiate-fee",
            text: "Try to negotiate the fee amount",
            isCorrect: false,
            explanation: "Wrong approach. Legitimate offers have zero fees. Negotiating validates the scam."
          }
        ],
        nextStepId: "completion",
      },
      {
        id: "completion",
        type: "completion",
        title: "Employment Security Expert!",
        content: "Outstanding! You've mastered job scam detection and can protect yourself and others from employment fraud. Remember: Real employers invest in you, they never ask you to invest in them. You've earned the 'Career Guardian' badge!",
      },
    ],
  },
  {
    id: "crypto-investment-scam",
    type: "email",
    title: "Cryptocurrency Investment Scam",
    difficulty: 4,
    points: 350,
    category: "general",
    region: "india",
    estimatedTime: 14,
    tags: ["crypto", "investment", "ponzi-scheme", "advanced"],
    fromName: "CoinBase Pro India",
    fromAddress: "support@coinbase-india.net",
    subject: "Limited Time: 300% Returns on Bitcoin Investment",
    bodyHtml: `<div style="font-family: Arial; padding: 20px; background: linear-gradient(135deg, #f7931e, #1652f0);">
      <div style="background: white; padding: 30px; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #1652f0;">CoinBase Pro India - Exclusive Offer</h2>
        <p><strong>Dear Crypto Investor,</strong></p>
        <p>You've been selected for our exclusive Bitcoin multiplier program. Invest minimum ₹10,000 and get guaranteed 300% returns in 30 days!</p>
        <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Investment Tiers:</h3>
          <ul>
            <li>₹10,000 → ₹30,000 (200% profit)</li>
            <li>₹50,000 → ₹1,50,000 (200% profit)</li>
            <li>₹1,00,000 → ₹3,00,000 (200% profit)</li>
          </ul>
        </div>
        <p><strong>Payment Method:</strong> Send Bitcoin to wallet: 1A2B3C4D5E6F7G8H9I0J</p>
        <a href="#" style="background: #f7931e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Invest Now - Limited Spots</a>
        <p><small>This offer expires in 24 hours. CoinBase Pro India Pvt Ltd.</small></p>
      </div>
    </div>`,
    linkUrl: "https://coinbase-india.net/invest",
    phishSignalHints: ["Unrealistic returns", "Fake domain", "Urgency tactics", "Advance payment"],
    answerKey: {
      isPhish: true,
      redFlags: [
        "300% returns in 30 days is mathematically impossible for legitimate investments",
        "Real Coinbase domain is 'coinbase.com', not 'coinbase-india.net'",
        "Legitimate crypto exchanges never guarantee returns",
        "Asking for direct Bitcoin transfers to personal wallets is a red flag"
      ],
    },
    steps: [
      {
        id: "intro",
        type: "intro",
        title: "Cryptocurrency Scam Investigation",
        content: "You've received an email promising 300% returns on Bitcoin investment. Crypto scams have exploded in India, targeting both new and experienced investors. You'll analyze this using financial fraud detection techniques.",
        nextStepId: "investment-analysis",
      },
      {
        id: "investment-analysis",
        type: "lesson",
        title: "Investment Mathematics Analysis",
        content: "300% returns in 30 days equals 3,600% annual returns. Even the best hedge funds average 20-30% annually. Such returns are mathematically impossible without extreme risk or fraud. This is a classic Ponzi scheme structure.",
        nextStepId: "domain-verification",
      },
      {
        id: "domain-verification",
        type: "interactive",
        title: "Exchange Domain Verification",
        component: "browser",
        data: {
          url: "https://coinbase-india.net/invest",
          title: "CoinBase Pro India Investment Portal",
          content: "<div style='background: linear-gradient(135deg, #f7931e, #1652f0); color: white; padding: 30px; text-align: center;'><h2>CoinBase Pro India</h2><p>Guaranteed Crypto Returns</p><div style='background: white; color: black; padding: 20px; margin: 20px; border-radius: 10px;'><h3>Bitcoin Multiplier Program</h3><p>Send Bitcoin to: 1A2B3C4D5E6F7G8H9I0J</p><p>Get 300% returns in 30 days!</p><button style='background: #f7931e; color: white; padding: 15px 30px; border: none; border-radius: 5px;'>Send Bitcoin Now</button></div></div>",
        },
        nextStepId: "crypto-security-lesson",
      },
      {
        id: "crypto-security-lesson",
        type: "lesson",
        title: "Cryptocurrency Security Principles",
        content: "Real crypto exchanges: 1) Never guarantee returns, 2) Use official domains (.com for global companies), 3) Have proper KYC processes, 4) Are regulated by financial authorities, 5) Never ask for direct wallet transfers for 'investments'.",
        nextStepId: "ponzi-quiz",
      },
      {
        id: "ponzi-quiz",
        type: "quiz",
        title: "Ponzi Scheme Recognition",
        content: "What makes this a classic Ponzi scheme?",
        options: [
          {
            id: "high-returns",
            text: "Promises unrealistically high returns",
            isCorrect: true,
            explanation: "✅ Correct! Ponzi schemes always promise returns that are too good to be true to attract victims."
          },
          {
            id: "uses-bitcoin",
            text: "Uses Bitcoin for transactions",
            isCorrect: false,
            explanation: "Bitcoin itself isn't a scam - it's a legitimate cryptocurrency. The scam is in the fake investment promise."
          },
          {
            id: "indian-company",
            text: "Claims to be an Indian company",
            isCorrect: false,
            explanation: "Many legitimate crypto companies operate in India. The location claim isn't the red flag here."
          }
        ],
        nextStepId: "verification-protocol",
      },
      {
        id: "verification-protocol",
        type: "lesson",
        title: "Crypto Investment Verification",
        content: "Before any crypto investment: 1) Check company registration with MCA, 2) Verify SEBI registration for investment advice, 3) Research on official exchange websites, 4) Never send crypto to unknown wallets, 5) Consult financial advisors for large investments.",
        nextStepId: "final-assessment",
      },
      {
        id: "final-assessment",
        type: "quiz",
        title: "Investment Security Assessment",
        content: "A friend shows you a 'guaranteed' crypto doubling scheme. What's your response?",
        options: [
          {
            id: "invest-small",
            text: "Invest a small amount to test it",
            isCorrect: false,
            explanation: "🚨 Even small amounts fund scammers and encourage them to target more victims."
          },
          {
            id: "research-warn",
            text: "Research thoroughly and warn your friend",
            isCorrect: true,
            explanation: "⭐ Excellent! Protecting friends from scams and doing due diligence is the right approach."
          },
          {
            id: "ignore-it",
            text: "Ignore it completely",
            isCorrect: false,
            explanation: "While safe for you, your friend might lose money. Warning them is the ethical choice."
          }
        ],
        nextStepId: "completion",
      },
      {
        id: "completion",
        type: "completion",
        title: "Crypto Security Expert Certified!",
        content: "Outstanding! You've mastered cryptocurrency scam detection and can protect yourself and others from investment fraud. Remember: If it sounds too good to be true, it probably is. You've earned the 'Crypto Guardian' badge!",
      },
    ],
  },
  {
    id: "romance-scam-investigation",
    type: "sms",
    title: "Romance Scam Investigation",
    difficulty: 5,
    points: 400,
    category: "social-engineering",
    region: "india",
    estimatedTime: 16,
    tags: ["romance", "emotional-manipulation", "catfishing", "advanced"],
    smsText: "Hi, I'm Sarah from London. I saw your profile and felt a connection. I'm a doctor working with UN in Syria. Can we chat? I have something important to share about my inheritance. WhatsApp: +44-7911-123456",
    linkUrl: "https://wa.me/447911123456",
    phishSignalHints: ["Unsolicited contact", "Emotional manipulation", "Foreign number", "Inheritance mention"],
    answerKey: {
      isPhish: true,
      redFlags: [
        "Unsolicited romantic interest from stranger",
        "Claims to be foreign professional in conflict zone",
        "Mentions inheritance (classic advance fee setup)",
        "Requests to move conversation to WhatsApp immediately"
      ],
    },
    steps: [
      {
        id: "intro",
        type: "intro",
        title: "Romance Scam Investigation",
        content: "You've received a message from someone claiming romantic interest. Romance scams cost Indians over ₹100 crores annually, targeting lonely individuals with fake relationships. You'll analyze this using behavioral psychology and fraud detection techniques.",
        nextStepId: "profile-analysis",
      },
      {
        id: "profile-analysis",
        type: "lesson",
        title: "Scammer Profile Analysis",
        content: "Classic romance scammer profile: 1) Foreign professional (doctor, engineer, military), 2) Working in remote/dangerous location, 3) Recently widowed/divorced, 4) Has inheritance or valuable assets, 5) Falls in love unusually quickly.",
        nextStepId: "emotional-tactics",
      },
      {
        id: "emotional-tactics",
        type: "lesson",
        title: "Emotional Manipulation Tactics",
        content: "Romance scammers use: 1) Love bombing (excessive affection quickly), 2) Mirroring (copying your interests), 3) Isolation (moving off dating platforms), 4) Crisis creation (emergencies needing money), 5) Future planning (marriage, meeting plans).",
        nextStepId: "communication-analysis",
      },
      {
        id: "communication-analysis",
        type: "interactive",
        title: "Communication Pattern Analysis",
        component: "browser",
        data: {
          url: "https://wa.me/447911123456",
          title: "WhatsApp Chat with Sarah",
          content: "<div style='background: #25d366; color: white; padding: 20px;'><h3>WhatsApp Chat</h3><div style='background: white; color: black; padding: 20px; margin: 10px 0; border-radius: 10px;'><p><strong>Sarah:</strong> Hello darling! I've been thinking about you all day. I know we just met but I feel such a strong connection ❤️</p><p><strong>Sarah:</strong> I'm a surgeon with Doctors Without Borders in Syria. It's dangerous here but I'm helping people.</p><p><strong>Sarah:</strong> I have to tell you something important about my late husband's inheritance... Can you help me?</p></div></div>",
        },
        nextStepId: "red-flags-quiz",
      },
      {
        id: "red-flags-quiz",
        type: "quiz",
        title: "Romance Scam Red Flags",
        content: "What's the BIGGEST red flag in this communication?",
        options: [
          {
            id: "too-fast-love",
            text: "Expressing love too quickly",
            isCorrect: false,
            explanation: "While suspicious, some people do fall in love quickly. The inheritance mention is more definitive."
          },
          {
            id: "inheritance-mention",
            text: "Mentioning inheritance and asking for help",
            isCorrect: true,
            explanation: "🎯 Perfect! Inheritance stories are classic advance fee fraud setups. This is the definitive scam indicator."
          },
          {
            id: "dangerous-location",
            text: "Working in a dangerous location",
            isCorrect: false,
            explanation: "Many legitimate professionals work in conflict zones. This alone isn't a red flag."
          }
        ],
        nextStepId: "verification-techniques",
      },
      {
        id: "verification-techniques",
        type: "lesson",
        title: "Identity Verification Techniques",
        content: "To verify online romantic interests: 1) Reverse image search their photos, 2) Video call at random times, 3) Ask specific questions about their claimed location/profession, 4) Never send money or personal documents, 5) Trust your instincts if something feels off.",
        nextStepId: "psychological-impact",
      },
      {
        id: "psychological-impact",
        type: "lesson",
        title: "Psychological Impact Understanding",
        content: "Romance scam victims often feel shame and embarrassment, making them reluctant to report. The emotional manipulation can be as damaging as financial loss. Understanding this helps in supporting victims and recognizing when you might be vulnerable.",
        nextStepId: "final-challenge",
      },
      {
        id: "final-challenge",
        type: "quiz",
        title: "Expert Challenge",
        content: "A close friend is in an online relationship and mentions sending money for their partner's 'emergency'. What do you do?",
        options: [
          {
            id: "mind-business",
            text: "Mind your own business - it's their choice",
            isCorrect: false,
            explanation: "⚠️ While respecting autonomy is important, friends should protect each other from obvious scams."
          },
          {
            id: "gentle-intervention",
            text: "Gently share information about romance scams and offer support",
            isCorrect: true,
            explanation: "✅ Perfect! Gentle education and emotional support help friends make informed decisions."
          },
          {
            id: "confront-directly",
            text: "Directly confront them about being scammed",
            isCorrect: false,
            explanation: "Direct confrontation often causes defensiveness. Gentle education is more effective."
          }
        ],
        nextStepId: "completion",
      },
      {
        id: "completion",
        type: "completion",
        title: "Romance Security Expert Certified!",
        content: "Exceptional work! You've mastered romance scam detection and can protect yourself and others from emotional manipulation fraud. Remember: Real love doesn't ask for money from strangers. You've earned the 'Heart Guardian' badge!",
      },
    ],
  },
  {
    id: "tax-refund-scam",
    type: "email",
    title: "Income Tax Refund Scam",
    difficulty: 3,
    points: 275,
    category: "general",
    region: "india",
    estimatedTime: 11,
    tags: ["tax", "government", "refund", "credential-theft"],
    fromName: "Income Tax Department",
    fromAddress: "refunds@incometax-india.gov.co.in",
    subject: "Tax Refund Approval - ₹47,350 Pending",
    bodyHtml: `<div style="font-family: Arial; padding: 20px; background: #fff;">
      <div style="background: #ff6600; color: white; padding: 20px; text-align: center;">
        <h2>Income Tax Department - Government of India</h2>
        <p>Ministry of Finance</p>
      </div>
      <div style="padding: 20px;">
        <p><strong>Dear Taxpayer,</strong></p>
        <p>Your income tax refund of <strong>₹47,350</strong> has been approved and is ready for processing.</p>
        <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Refund Details:</strong><br>
          Assessment Year: 2023-24<br>
          Refund Amount: ₹47,350<br>
          Processing Fee: ₹150<br>
          Net Amount: ₹47,200
        </div>
        <p>To process your refund, please verify your details and pay the processing fee:</p>
        <a href="#" style="background: #ff6600; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Claim Refund Now</a>
        <p><small>This refund will expire in 15 days. Income Tax Department, New Delhi.</small></p>
      </div>
    </div>`,
    linkUrl: "https://incometax-india.gov.co.in/refund",
    phishSignalHints: ["Fake government domain", "Processing fee for refund", "Urgency tactics", "Credential theft"],
    answerKey: {
      isPhish: true,
      redFlags: [
        "Official IT domain is 'incometaxtindiaefiling.gov.in', not 'incometax-india.gov.co.in'",
        "Government never charges processing fees for tax refunds",
        "Real refunds are processed automatically to registered bank accounts",
        "Refunds don't expire - this creates false urgency"
      ],
    },
    steps: [
      {
        id: "intro",
        type: "intro",
        title: "Tax Refund Scam Investigation",
        content: "You've received an email about a pending tax refund. Tax-related scams spike during filing season, targeting taxpayers expecting legitimate refunds. You'll analyze this using government communication verification techniques.",
        nextStepId: "government-domain-analysis",
      },
      {
        id: "government-domain-analysis",
        type: "lesson",
        title: "Government Domain Verification",
        content: "Official Indian government domains follow strict patterns: 1) Always end with .gov.in, 2) Use department's exact name, 3) Income Tax uses 'incometaxindiaefiling.gov.in', 4) Never use hyphens or variations like .gov.co.in.",
        nextStepId: "refund-process-lesson",
      },
      {
        id: "refund-process-lesson",
        type: "lesson",
        title: "Legitimate Tax Refund Process",
        content: "Real IT refunds: 1) Are processed automatically to your registered bank account, 2) Never require processing fees, 3) Don't expire or have deadlines, 4) Are visible in your IT portal account, 5) Come with proper acknowledgment numbers.",
        nextStepId: "fake-portal-analysis",
      },
      {
        id: "fake-portal-analysis",
        type: "interactive",
        title: "Fake Portal Analysis",
        component: "browser",
        data: {
          url: "https://incometax-india.gov.co.in/refund",
          title: "Income Tax Refund Portal",
          content: "<div style='background: #ff6600; color: white; padding: 20px; text-align: center;'><h2>Income Tax Department</h2><p>Government of India</p></div><div style='padding: 20px; background: white;'><h3>Refund Processing</h3><p>Your refund: ₹47,350</p><form><input type='text' placeholder='PAN Number' style='width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ccc;'><input type='password' placeholder='IT Portal Password' style='width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ccc;'><input type='text' placeholder='Bank Account Number' style='width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ccc;'><p>Processing Fee: ₹150 <button style='background: #ff6600; color: white; padding: 5px 10px; border: none;'>Pay Now</button></p></form></div>",
        },
        nextStepId: "fee-scam-quiz",
      },
      {
        id: "fee-scam-quiz",
        type: "quiz",
        title: "Processing Fee Analysis",
        content: "Why is the ₹150 processing fee a major red flag?",
        options: [
          {
            id: "amount-small",
            text: "The amount is too small to be legitimate",
            isCorrect: false,
            explanation: "The amount size isn't the issue - government services can have small fees for some services."
          },
          {
            id: "government-no-fees",
            text: "Government never charges fees for tax refunds",
            isCorrect: true,
            explanation: "✅ Correct! Tax refunds are your own money being returned. Government never charges to give back what's yours."
          },
          {
            id: "online-payment",
            text: "Online payment is not secure",
            isCorrect: false,
            explanation: "Government does accept online payments for legitimate services. The issue is charging for refunds."
          }
        ],
        nextStepId: "verification-steps",
      },
      {
        id: "verification-steps",
        type: "lesson",
        title: "Tax Communication Verification",
        content: "To verify tax communications: 1) Log into official IT portal independently, 2) Check refund status there, 3) Call IT helpline 1961, 4) Visit nearest IT office, 5) Never pay fees for refunds, 6) Report fake emails to cybercrime.gov.in.",
        nextStepId: "final-assessment",
      },
      {
        id: "final-assessment",
        type: "quiz",
        title: "Tax Security Assessment",
        content: "You receive a call claiming to be from IT department asking for immediate payment of pending taxes. What's your response?",
        options: [
          {
            id: "pay-immediately",
            text: "Pay immediately to avoid penalties",
            isCorrect: false,
            explanation: "🚨 Never pay based on unsolicited calls. This is a common scam tactic."
          },
          {
            id: "verify-independently",
            text: "Hang up and verify through official IT portal",
            isCorrect: true,
            explanation: "🎯 Perfect! Always verify tax matters through official channels, never through unsolicited communications."
          },
          {
            id: "ask-details",
            text: "Ask for more details about the pending taxes",
            isCorrect: false,
            explanation: "Engaging with scammers gives them opportunity to manipulate you. Hang up and verify independently."
          }
        ],
        nextStepId: "completion",
      },
      {
        id: "completion",
        type: "completion",
        title: "Tax Security Expert Certified!",
        content: "Excellent work! You've mastered tax-related scam detection and can protect yourself from government impersonation fraud. Remember: Real government refunds are free and automatic. You've earned the 'Tax Guardian' badge!",
      },
    ],
  },
  {
    id: "lottery-prize-scam",
    type: "sms",
    title: "International Lottery Scam",
    difficulty: 2,
    points: 200,
    category: "general",
    region: "india",
    estimatedTime: 9,
    tags: ["lottery", "advance-fee", "international", "prize"],
    smsText: "CONGRATULATIONS! You've won £750,000 in UK National Lottery International Draw. Your ticket number: UK/2024/7892. To claim prize, contact: claim@uklottery-international.org with processing fee ₹5,000. Ref: WIN/UK/2024/INT",
    linkUrl: "mailto:claim@uklottery-international.org",
    phishSignalHints: ["Unsolicited lottery win", "Advance fee request", "Foreign lottery", "Processing fee"],
    answerKey: {
      isPhish: true,
      redFlags: [
        "You cannot win a lottery you never entered",
        "Legitimate lotteries never charge fees to claim prizes",
        "Real UK National Lottery doesn't have 'international draws' for non-participants",
        "Official lottery communications come through registered mail, not SMS"
      ],
    },
    steps: [
      {
        id: "intro",
        type: "intro",
        title: "International Lottery Scam Investigation",
        content: "You've received an SMS claiming you've won a massive lottery prize. Lottery scams are among the oldest fraud types, but they still work because they exploit hope and greed. You'll analyze this using probability and legal frameworks.",
        nextStepId: "probability-analysis",
      },
      {
        id: "probability-analysis",
        type: "lesson",
        title: "Lottery Probability Analysis",
        content: "Mathematical Reality: You cannot win a lottery you never entered. Legitimate lotteries require ticket purchase and participation. The probability of being randomly selected from global population for a prize is essentially zero.",
        nextStepId: "legal-framework",
      },
      {
        id: "legal-framework",
        type: "lesson",
        title: "International Lottery Legal Framework",
        content: "Legal Facts: 1) Most countries prohibit cross-border lottery sales, 2) UK National Lottery is only for UK residents, 3) Winners are notified through official channels, not SMS, 4) Prize claims require identity verification, not fees.",
        nextStepId: "advance-fee-mechanics",
      },
      {
        id: "advance-fee-mechanics",
        type: "lesson",
        title: "Advance Fee Fraud Mechanics",
        content: "The Scam Process: 1) Hook with large prize, 2) Request small processing fee, 3) Create urgency with deadlines, 4) Ask for more fees (taxes, insurance, etc.), 5) Victim realizes fraud only after multiple payments.",
        nextStepId: "verification-quiz",
      },
      {
        id: "verification-quiz",
        type: "quiz",
        title: "Lottery Verification Quiz",
        content: "How can you verify if a lottery win is legitimate?",
        options: [
          {
            id: "contact-organizers",
            text: "Contact the lottery organizers using the provided email",
            isCorrect: false,
            explanation: "⚠️ Never use contact information from suspicious messages. Scammers control those channels."
          },
          {
            id: "check-official-website",
            text: "Check the official lottery website independently",
            isCorrect: true,
            explanation: "✅ Correct! Always verify through official websites found through independent searches."
          },
          {
            id: "pay-small-fee",
            text: "Pay the small processing fee to test legitimacy",
            isCorrect: false,
            explanation: "🚨 Never pay fees to claim prizes. This funds scammers and encourages more fraud."
          }
        ],
        nextStepId: "psychological-tactics",
      },
      {
        id: "psychological-tactics",
        type: "lesson",
        title: "Psychological Manipulation Tactics",
        content: "Lottery scams exploit: 1) Hope (desire for financial freedom), 2) Greed (large prize amounts), 3) Urgency (limited time to claim), 4) Authority (official-sounding organizations), 5) Social proof (reference numbers and codes).",
        nextStepId: "final-assessment",
      },
      {
        id: "final-assessment",
        type: "quiz",
        title: "Scam Recognition Assessment",
        content: "A family member excitedly shows you a lottery win notification and wants to pay the processing fee. What do you do?",
        options: [
          {
            id: "support-decision",
            text: "Support their decision - it's their money",
            isCorrect: false,
            explanation: "While respecting autonomy is important, protecting family from obvious scams is more important."
          },
          {
            id: "educate-gently",
            text: "Gently explain lottery scam tactics and help them verify",
            isCorrect: true,
            explanation: "⭐ Excellent! Education and support help family members make informed decisions."
          },
          {
            id: "pay-for-them",
            text: "Offer to pay the fee yourself",
            isCorrect: false,
            explanation: "This still funds scammers and doesn't address the underlying deception."
          }
        ],
        nextStepId: "completion",
      },
      {
        id: "completion",
        type: "completion",
        title: "Lottery Security Expert Certified!",
        content: "Great work! You've mastered lottery scam detection and can protect yourself and others from advance fee fraud. Remember: Real prizes don't require payment to claim. You've earned the 'Prize Guardian' badge!",
      },
    ],
  }
]

export const allEnhancedScenarios = [...enhancedScenarios]