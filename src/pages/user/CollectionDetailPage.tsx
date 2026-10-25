import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function CollectionDetailPage() {
  return (
    <>
      <Navbar />

      <main className="collection-detail-page">
        <section className="collection-detail-card">
          <p className="collection-detail-kicker">
            DETAIL KOLEKSI
          </p>

          <h1>Detail Koleksi</h1>

          <p className="collection-detail-description">
            Informasi lengkap mengenai koleksi atau karya akan ditampilkan
            pada halaman ini.
          </p>
        </section>
      </main>

      <Footer />

      <style>{`
        .collection-detail-page {
          min-height: calc(100vh - 160px);

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 60px 24px;

          background: #fffdf9;
        }

        .collection-detail-card {
          width: 100%;
          max-width: 760px;

          padding: 36px;

          border: 1px solid #eadfce;
          border-radius: 12px;

          background: #ffffff;

          box-shadow:
            0 12px 32px rgba(75, 51, 38, .06);
        }

        .collection-detail-kicker {
          margin: 0 0 8px;

          color: #ae8147;

          font-size: 9px;
          font-weight: 700;
          letter-spacing: .20em;
        }

        .collection-detail-card h1 {
          margin: 0;

          color: #681220;

          font-family: 'Lora', serif;
          font-size: 34px;
          line-height: 1.2;
        }

        .collection-detail-description {
          margin: 12px 0 0;

          color: #756a65;

          font-size: 11px;
          line-height: 1.7;
        }

        @media (max-width: 600px) {
          .collection-detail-page {
            padding: 40px 18px;
          }

          .collection-detail-card {
            padding: 28px 22px;
          }

          .collection-detail-card h1 {
            font-size: 29px;
          }
        }
      `}</style>
    </>
  )
}