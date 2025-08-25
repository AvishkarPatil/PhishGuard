import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react"

export default function PrivacyPage() {
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
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
          </div>

          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-6">
                At PhishGuard, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our cybersecurity training platform.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Personal Information</h4>
                    <p className="text-muted-foreground">
                      Name, email address, company information, and role details you provide during registration.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Training Data</h4>
                    <p className="text-muted-foreground">
                      Simulation results, quiz answers, progress tracking, and learning analytics to improve your
                      training experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Usage Information</h4>
                    <p className="text-muted-foreground">
                      Device information, IP address, browser type, and platform usage patterns for security and
                      optimization.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Provide and maintain our cybersecurity training services</li>
                <li>Personalize your learning experience and track progress</li>
                <li>Generate analytics and insights for administrators</li>
                <li>Communicate with you about your account and updates</li>
                <li>Improve our platform and develop new features</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="mb-6">
                We implement industry-standard security measures including encryption, secure data centers, regular
                security audits, and access controls. All data is encrypted in transit and at rest using AES-256
                encryption.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
              <p className="mb-6">
                We do not sell, trade, or rent your personal information to third parties. We may share aggregated,
                anonymized data for research and improvement purposes. Your training data may be shared with your
                organization's administrators as part of the service.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Access and review your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Export your training data</li>
                <li>Opt-out of non-essential communications</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> privacy@phishguard.com
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
