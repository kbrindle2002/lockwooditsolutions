export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-invert">
      <h1>Legal & Policies</h1>
      <h2>Terms of Service (Effective: 2025-08-29)</h2>
      <p>Services are billed monthly; on-site outside inclusions billed hourly. We access systems only to deliver support. No system is perfectly secure; we are not liable for indirect damages. These Terms are governed by Wisconsin law with binding arbitration in Racine County.</p>

      <h2>Privacy Policy (Effective: 2025-08-29)</h2>
      <p>We collect contact info and diagnostic data to deliver support. We don’t sell personal data. Data may be shared with vendors required to provide services under confidentiality. You may request access/correction/deletion subject to legal obligations.</p>

      <p className="text-sm text-slate-400 mt-8">
        Download PDFs: <a href="/Lockwood_IT_Terms.pdf" className="underline">Terms</a> • <a href="/Lockwood_IT_Privacy.pdf" className="underline">Privacy</a>
      </p>
    </div>
  );
}
