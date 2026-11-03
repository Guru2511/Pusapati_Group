import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BadgeCheck,
  ClipboardCheck,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  ReceiptText,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_site/vendors/portal")({
  component: PortalPage,
  head: () => ({
    meta: [
      { title: "Vendor Portal Preview — Pusapati Group" },
      {
        name: "description",
        content:
          "A frontend prototype of the Pusapati Group vendor portal: dashboard, KYC documents, RFQs, purchase orders, invoices and performance.",
      },
    ],
  }),
});

const rfqs = [
  { ref: "RFQ-2026-118", title: "20 mm aggregate — 4,500 t", due: "12 Nov 2026", status: "Invited" },
  { ref: "RFQ-2026-121", title: "Transit mixer hire — 6 months", due: "19 Nov 2026", status: "Draft quote" },
  { ref: "RFQ-2026-109", title: "OPC 53 grade cement — 1,200 bags", due: "Closed", status: "Submitted" },
];

const orders = [
  { ref: "PO-2026-0342", item: "20 mm aggregate", qty: "1,200 t", value: "₹—", status: "In delivery" },
  { ref: "PO-2026-0288", item: "M-sand", qty: "800 t", value: "₹—", status: "Delivered" },
  { ref: "PO-2026-0251", item: "Plant spares", qty: "1 lot", value: "₹—", status: "Closed" },
];

const invoices = [
  { ref: "INV-2026-0912", po: "PO-2026-0288", amount: "₹—", status: "Paid (sample)" },
  { ref: "INV-2026-0945", po: "PO-2026-0342", amount: "₹—", status: "Under review" },
  { ref: "INV-2026-0871", po: "PO-2026-0251", amount: "₹—", status: "Paid (sample)" },
];

const docs = [
  { name: "GST registration", status: "Verified (sample)" },
  { name: "PAN card", status: "Verified (sample)" },
  { name: "Bank details letter", status: "Verified (sample)" },
  { name: "Category certification", status: "Pending upload" },
];

function StatusPill({ children, tone = "neutral" }) {
  const tones = {
    neutral: "border-ink/20 text-ink/70",
    good: "border-emerald-700/30 bg-emerald-700/5 text-emerald-800",
    warn: "border-amber-700/30 bg-amber-700/5 text-amber-800",
  };
  return (
    <span className={`inline-flex items-center border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

function DataRows({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-ink/15">
            {headers.map((h) => (
              <th key={h} className="py-3 pr-4 font-mono text-[9px] uppercase tracking-[0.16em] text-slate">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.ref} className="border-b border-ink/10">
              {Object.entries(r).map(([k, v], i) => (
                <td key={k} className={`py-3.5 pr-4 text-[13px] ${i === 0 ? "font-medium text-ink" : "text-slate"}`}>
                  {k === "status" ? (
                    <StatusPill tone={v.toLowerCase().includes("paid") || v.toLowerCase().includes("delivered") ? "good" : "warn"}>
                      {v}
                    </StatusPill>
                  ) : (
                    v
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PortalPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-ink text-paper">
        <div className="blueprint-dark">
          <div className="container-x py-12 lg:py-16">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-orange px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink">
                Prototype
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
                Vendor portal — frontend concept
              </span>
            </div>

            <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              The vendor workspace, previewed.
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-paper/60">
              This page demonstrates the intended vendor experience. All names, references, amounts and
              statuses below are sample data. There is no live login, document verification or payment
              processing behind it.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/vendors"
                hash="register"
                className="inline-flex min-h-[46px] items-center gap-2 bg-orange px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-[#c95f10]"
              >
                Register as a vendor
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/vendors"
                className="inline-flex min-h-[46px] items-center gap-2 border border-paper/25 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                Back to vendor information
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-amber-700/25 bg-amber-50">
        <div className="container-x py-4">
          <p className="text-[12px] leading-relaxed text-amber-900">
            <strong className="font-semibold">Demo mode:</strong> this portal is a functional frontend
            prototype only. No documents are verified, no RFQs are live and no payments are processed. Real
            onboarding happens through the registration form and the procurement team.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-12">
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="border border-ink/12 bg-paper p-5">
                <div className="grid h-12 w-12 place-items-center bg-concrete font-display text-[15px] font-semibold text-ink">
                  SV
                </div>
                <p className="mt-4 text-[15px] font-semibold leading-snug tracking-tight text-ink">
                  Sample Vendor Pvt Ltd
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate">
                  Vendor code VN-2026-0142
                </p>
                <div className="mt-3">
                  <StatusPill tone="good">Approved (sample)</StatusPill>
                </div>

                <dl className="mt-5 space-y-2.5 border-t border-ink/10 pt-4 text-[12px]">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate">Category</dt>
                    <dd className="text-right text-ink">Logistics & transport</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate">Joined</dt>
                    <dd className="text-right text-ink">14 Feb 2026</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate">Rating</dt>
                    <dd className="text-right text-ink">Sample only</dd>
                  </div>
                </dl>

                <div className="mt-5 space-y-1.5 border-t border-ink/10 pt-4">
                  {[
                    { icon: LayoutDashboard, label: "Dashboard" },
                    { icon: ShieldCheck, label: "Profile & KYC" },
                    { icon: ClipboardCheck, label: "RFQs" },
                    { icon: FileText, label: "Purchase orders" },
                    { icon: ReceiptText, label: "Invoices" },
                    { icon: LogOut, label: "Sign out" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-2.5 px-2 py-2 text-[12px] text-slate"
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4 text-[10px] leading-relaxed text-slate/60">
                  Sidebar navigation is illustrative; use the tabs to move between sections.
                </p>
              </div>
            </aside>

            <div className="lg:col-span-8 xl:col-span-9">
              <Tabs defaultValue="dashboard">
                <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-none border-b border-ink/15 bg-transparent p-0">
                  {[
                    { value: "dashboard", label: "Dashboard" },
                    { value: "profile", label: "Profile & KYC" },
                    { value: "rfqs", label: "RFQs" },
                    { value: "orders", label: "Purchase orders" },
                    { value: "invoices", label: "Invoices" },
                    { value: "performance", label: "Performance" },
                    { value: "access", label: "Access screens" },
                  ].map((t) => (
                    <TabsTrigger
                      key={t.value}
                      value={t.value}
                      className="rounded-none border-b-2 border-transparent px-3 py-3 text-[12px] font-medium text-slate data-[state=active]:border-orange data-[state=active]:bg-transparent data-[state=active]:text-ink data-[state=active]:shadow-none"
                    >
                      {t.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="dashboard" className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { label: "Open RFQs", value: "2", icon: ClipboardCheck },
                      { label: "Active POs", value: "1", icon: FileText },
                      { label: "Invoices pending", value: "1", icon: CreditCard },
                    ].map((m) => {
                      const Icon = m.icon;
                      return (
                        <div key={m.label} className="border border-ink/12 p-5">
                          <Icon className="h-4 w-4 text-orange" aria-hidden="true" />
                          <p className="mt-4 font-display text-[30px] font-semibold leading-none tracking-tight text-ink">
                            {m.value}
                          </p>
                          <p className="mt-1.5 text-[12px] text-slate">{m.label}</p>
                          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-slate/60">
                            Sample data
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 border border-ink/12 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">
                      Recent activity
                    </p>
                    <ul className="mt-4 space-y-3.5">
                      {[
                        "RFQ-2026-118 issued — 20 mm aggregate, 4,500 t",
                        "PO-2026-0342 released — delivery window 04–09 Nov",
                        "INV-2026-0945 received — under review",
                        "Category certification pending upload",
                      ].map((a) => (
                        <li key={a} className="flex gap-3 border-b border-ink/10 pb-3 text-[13px] text-slate last:border-0 last:pb-0">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="profile" className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Legal name", value: "Sample Vendor Pvt Ltd" },
                      { label: "Category", value: "Logistics & transport" },
                      { label: "GSTIN", value: "22AAAAA0000A1Z5 (sample)" },
                      { label: "Contact", value: "vendor@example.com" },
                    ].map((f) => (
                      <div key={f.label} className="border border-ink/12 p-4">
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate">{f.label}</p>
                        <p className="mt-1.5 text-[14px] text-ink">{f.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border border-ink/12 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">
                      KYC documents
                    </p>
                    <ul className="mt-4 divide-y divide-ink/10">
                      {docs.map((d) => (
                        <li key={d.name} className="flex flex-wrap items-center justify-between gap-3 py-3">
                          <span className="text-[13px] text-ink">{d.name}</span>
                          <span className="flex items-center gap-3">
                            <StatusPill tone={d.status.includes("Verified") ? "good" : "warn"}>{d.status}</StatusPill>
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate/70"
                              disabled
                            >
                              <Upload className="h-3.5 w-3.5" /> Upload
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[11px] text-slate/60">
                      Upload is disabled in this prototype. Documents are collected by email during onboarding.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="rfqs" className="mt-6">
                  <DataRows headers={["Reference", "Requirement", "Due", "Status"]} rows={rfqs} />
                  <p className="mt-3 text-[11px] text-slate/60">Sample RFQs — none are live.</p>
                </TabsContent>

                <TabsContent value="orders" className="mt-6">
                  <DataRows headers={["Reference", "Item", "Quantity", "Value", "Status"]} rows={orders} />
                  <p className="mt-3 text-[11px] text-slate/60">
                    Values are withheld in this prototype. Live purchase orders are issued only to approved vendors.
                  </p>
                </TabsContent>

                <TabsContent value="invoices" className="mt-6">
                  <DataRows headers={["Invoice", "Against PO", "Amount", "Status"]} rows={invoices} />
                  <p className="mt-3 text-[11px] text-slate/60">
                    No payment processing exists in this prototype.
                  </p>
                </TabsContent>

                <TabsContent value="performance" className="mt-6">
                  <div className="border border-ink/12 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">
                      Performance indicators
                    </p>
                    <ul className="mt-4 space-y-4">
                      {[
                        { label: "On-time delivery", note: "Tracked per purchase order" },
                        { label: "Quality acceptance", note: "Based on receipt inspection" },
                        { label: "Documentation compliance", note: "Invoice and e-way bill accuracy" },
                        { label: "Responsiveness", note: "RFQ response within window" },
                      ].map((p) => (
                        <li key={p.label} className="border-b border-ink/10 pb-3 last:border-0 last:pb-0">
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="text-[13px] font-medium text-ink">{p.label}</span>
                            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate/60">
                              Sample
                            </span>
                          </div>
                          <p className="mt-1 text-[12px] text-slate">{p.note}</p>
                          <div className="mt-2 h-1.5 w-full bg-ink/10">
                            <div className="h-full w-1/2 bg-orange/50" />
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[11px] text-slate/60">
                      Scores shown are illustrative, not actual vendor performance.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="access" className="mt-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="border border-ink/12 p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">Sign in</p>
                      <div className="mt-4 space-y-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.1em] text-ink/60">Vendor code or email</p>
                          <div className="mt-1 h-11 border border-ink/15 bg-concrete/40" />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.1em] text-ink/60">Password</p>
                          <div className="mt-1 h-11 border border-ink/15 bg-concrete/40" />
                        </div>
                        <div className="h-11 bg-ink/85" />
                        <p className="text-[10px] text-slate/60">Disabled in prototype — no live authentication.</p>
                      </div>
                    </div>

                    <div className="border border-ink/12 p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">Register</p>
                      <ul className="mt-4 space-y-2.5 text-[13px] text-slate">
                        {["Company and contact details", "Category selection", "Document upload", "Procurement review"].map((s) => (
                          <li key={s} className="flex gap-2.5">
                            <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange" aria-hidden="true" />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/vendors"
                        hash="register"
                        className="mt-5 inline-flex min-h-[44px] items-center gap-2 bg-ink px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-orange hover:text-ink"
                      >
                        Use the real registration form
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}