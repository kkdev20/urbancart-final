// app/checkout/success/page.tsx - MINIMAL VERSION
export default function CheckoutSuccessPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '42rem', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#d1fae5', borderRadius: '9999px', padding: '1rem', width: '5rem', height: '5rem', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg style={{ width: '2.5rem', height: '2.5rem', color: '#059669' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
          Pesanan Berhasil!
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '2rem' }}>
          Terima kasih telah berbelanja di UrbanCart
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' }}>
          <a href="/" style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', color: '#374151', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </a>
          
          <a href="/products" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Lanjutkan Belanja
          </a>
        </div>
      </div>
    </div>
  );
}