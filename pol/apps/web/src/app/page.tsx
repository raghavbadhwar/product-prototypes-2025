import { ArrowRight, CheckCircle, Globe, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const FEATURE_CARDS = [
  {
    title: "Sub-second checks",
    description: "Pipeline verifies each credential in under 300ms.",
    icon: Zap,
  },
  {
    title: "Familiar workflows",
    description: "Issue in bulk, revoke, and audit without crypto jargon.",
    icon: Users,
  },
  {
    title: "Global-ready",
    description: "Compatible with employers, universities, and regulators.",
    icon: Globe,
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-16">
        <section className="grid gap-12 rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-xl sm:p-12 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="flex flex-col gap-10">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                Digital Certificates, Verified in Seconds
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                Give registrars, universities, and credential issuers a console built for how they already work—secure issuance, instant verification, and no crypto wallets for holders.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="group bg-blue-600 text-white hover:bg-blue-700">
                  <Link href="/issue/single">
                    <Shield className="h-5 w-5" />
                    Issue your first certificate
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-slate-200 text-slate-700">
                  <Link href="/verify">
                    <CheckCircle className="h-5 w-5" />
                    Verify a credential
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {FEATURE_CARDS.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card key={feature.title} className="h-full border-slate-200 bg-white/80 backdrop-blur">
                    <CardHeader className="space-y-3">
                      <div className="inline-flex items-center justify-center rounded-full bg-blue-50 p-2 text-blue-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg text-slate-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Card className="border-slate-200 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  Credentials issued this month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-semibold text-slate-900">3,284</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white/80 backdrop-blur">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-semibold text-slate-900">University of Lagos</CardTitle>
                <p className="text-sm text-slate-600">Diploma batch · 214 records</p>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">Issued · 28s</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
