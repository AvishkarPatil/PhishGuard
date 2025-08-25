import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
          </div>

          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="mb-6">
                By accessing and using PhishGuard's cybersecurity training platform, you accept and agree to be bound by
                the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
              <p className="mb-6">
                PhishGuard provides AI-powered cybersecurity awareness training through simulated phishing attacks,
                educational content, and analytics. Our platform helps organizations build security awareness and reduce
                cyber risk.
              </p>

              <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the platform only for legitimate training purposes</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not attempt to reverse engineer or compromise the platform</li>
                <li>Report any security vulnerabilities responsibly</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
              <p className="mb-4">You agree not to use the platform to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Conduct actual phishing attacks or malicious activities</li>
                <li>Share training content outside your organization without permission</li>
                <li>Interfere with other users' access to the platform</li>
                <li>Upload malicious code or attempt to breach security</li>
                <li>Use the platform for any illegal or unauthorized purpose</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="mb-6">
                All content, features, and functionality of PhishGuard are owned by us and are protected by copyright,
                trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative
                works without our written permission.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
              <p className="mb-6">
                We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We may temporarily
                suspend access for maintenance, updates, or security reasons with reasonable notice.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="mb-6">
                PhishGuard shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                resulting from your use of the platform. Our total liability shall not exceed the amount paid by you for
                the service.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="mb-6">
                We may terminate or suspend your account immediately if you breach these terms. Upon termination, your
                right to use the platform ceases, and we may delete your data after a reasonable retention period.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p className="mb-6">
                We reserve the right to modify these terms at any time. We will notify users of significant changes via
                email or platform notifications. Continued use constitutes acceptance of modified terms.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="bg-muted p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> legal@phishguard.com
                </p>
                <p>
                  <strong>Address:</strong> Cyber City, Sector 24, Gurugram, Haryana 122002, India
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
