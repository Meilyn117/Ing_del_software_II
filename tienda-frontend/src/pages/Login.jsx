import Header from "../components/Header";

export default function Login() {
  const placeholders = Array.from({ length: 6 });

  return (
    <div data-testid="login-page" className="login-screen">
      <Header />

      <main className="login-content">
        <h1 className="page-title" data-testid="login-title-h1">Tienda Online</h1>

        <section className="cards-grid" data-testid="login-cards-grid">
          {placeholders.map((_, idx) => (
            <article
              key={idx}
              className="card"
              data-testid={`product-card-${idx + 1}`}
            >
              <div className="card-img" />
              <div className="card-body">
                <h3 className="card-title">Producto {idx + 1}</h3>
                <p className="card-text">Descripción breve del producto.</p>
                <button className="card-btn" type="button" disabled>Ver más</button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
