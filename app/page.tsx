import Link from "next/link";
import Reveal from "@/components/Reveal";
import CategoryCard from "@/components/CategoryCard";
import HeroVideo from "@/components/HeroVideo";
import Wave from "@/components/Wave";
import { KATEGORIER, FORETAG } from "@/lib/data";

export const metadata = { alternates: { canonical: "/" } };

const EJDER_IMG = "/assets/Ejder.jpg";

export default function Home() {
  return (
    <div className="page-mount">
      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          minHeight: 600,
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/Hero3.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "heroZoom 16s ease-out both",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top,rgba(18,32,38,0.92) 0%,rgba(18,32,38,0.55) 45%,rgba(18,32,38,0.22) 75%,rgba(18,32,38,0.12) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(100deg,rgba(18,32,38,0.55) 0%,rgba(18,32,38,0.2) 45%,rgba(18,32,38,0) 70%)",
          }}
        />
        <div
          className="container hero-inner"
          style={{
            position: "relative",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            className="hero-eyebrow"
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(253,251,246,0.75)",
              marginBottom: 16,
              animation: "heroText 0.7s ease 0.05s both",
            }}
          >
            Öckerö Cementgjuteri · Göteborgs skärgård
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif), serif",
              fontWeight: 400,
              fontSize: 58,
              lineHeight: 1.02,
              color: "var(--ljus)",
              margin: "0 0 18px",
              maxWidth: "22ch",
              textShadow: "0 2px 24px rgba(18,32,38,0.5)",
              animation: "heroText 0.7s ease 0.15s both",
            }}
          >
            Byggmaterial och betong i Göteborgs skärgård
          </h1>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: "rgba(253,251,246,0.95)",
              maxWidth: "56ch",
              margin: "0 0 32px",
              textWrap: "pretty",
              textShadow: "0 1px 12px rgba(18,32,38,0.55)",
              animation: "heroText 0.7s ease 0.3s both",
            }}
          >
            Vi säljer och levererar kvalitetsvaror till husgrunder och trädgårdar
            främst i Göteborgs Skärgård och Torslanda. Med ett brett sortiment
            erbjuder vi byggmaterial, maskinuthyrning, ved och färdig betong.
          </p>
          <div
            className="hero-cta"
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              animation: "heroText 0.7s ease 0.45s both",
            }}
          >
            <Link
              href="/produkter"
              className="btn btn-light"
              style={{ fontSize: 15.5, padding: "14px 26px" }}
            >
              Se våra produkter
            </Link>
            <Link
              href="/kontakt"
              className="btn"
              style={{
                border: "1px solid rgba(253,251,246,0.5)",
                color: "var(--ljus)",
                fontSize: 15.5,
                padding: "14px 26px",
              }}
            >
              Kontakta oss
            </Link>
          </div>
        </div>
      </section>

      {/* ── Öppettider + snabbfakta (överlappar hero) ── */}
      <section
        className="container"
        style={{
          margin: "-34px auto 0",
          padding: "0 28px",
          position: "relative",
          zIndex: 2,
          animation: "heroText 0.7s ease 0.55s both",
        }}
      >
        <div
          className="grid-3"
          style={{
            background: "var(--paper)",
            border: "1px solid var(--kant)",
            borderRadius: 14,
            boxShadow: "0 14px 40px rgba(24,40,46,0.1)",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "26px 30px",
              borderRight: "1px solid var(--kant)",
            }}
          >
            <div style={eyebrowStyle}>Våra öppettider</div>
            <div style={{ fontSize: 16.5, fontWeight: 600 }}>
              {FORETAG.oppettiderRad1}
            </div>
            <div style={{ fontSize: 16.5, fontWeight: 600 }}>{FORETAG.oppettiderRad2}</div>
          </div>
          <div
            style={{
              padding: "26px 30px",
              borderRight: "1px solid var(--kant)",
            }}
          >
            <div style={eyebrowStyle}>Leverans</div>
            <div style={{ fontSize: 15.5, lineHeight: 1.5, color: "#3A484C" }}>
              Vi levererar i Göteborgs skärgård och Torslanda — även färdig
              betong.
            </div>
          </div>
          <div style={{ padding: "26px 30px" }}>
            <div style={eyebrowStyle}>Hitta hit</div>
            <div style={{ fontSize: 15.5, lineHeight: 1.5, color: "#3A484C" }}>
              Industriområde S Långesand 7
              <br />
              475 31 Öckerö
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 — Sortiment (sandband för rytm) ── */}
      <div style={{ marginTop: 70 }}>
        <Wave fill="rgba(232,225,210,0.5)" />
        <div className="band-sand" style={{ paddingBottom: 8 }}>
          <Reveal
            style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 28px 30px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 20,
                marginBottom: 34,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={sectionEyebrow}>01 — Produkter</div>
                <h2 style={{ fontSize: 46, margin: 0 }}>Vårt sortiment</h2>
              </div>
              <Link href="/produkter" className="link-arrow" style={{ fontSize: 15 }}>
                Alla produkter →
              </Link>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: 20,
              }}
            >
              {KATEGORIER.map((kat) => (
                <CategoryCard
                  key={kat.slug}
                  href={`/produkter/${kat.slug}`}
                  name={kat.name}
                  desc={kat.desc}
                  img={kat.img}
                />
              ))}
            </div>
          </Reveal>
        </div>
        <Wave fill="rgba(232,225,210,0.5)" flip />
      </div>

      {/* ── 02 — Uthyrning-band ── */}
      <Reveal style={{ maxWidth: 1200, margin: "0 auto", padding: "50px 28px" }}>
        <div
          className="grid-2"
          style={{
            background:
              "linear-gradient(135deg, #24404C 0%, #1F4A56 55%, #2E6E7E 130%)",
            borderRadius: 16,
            padding: "52px 56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 36,
            flexWrap: "wrap",
            boxShadow: "0 20px 46px rgba(24,40,46,0.18)",
          }}
        >
          <div style={{ maxWidth: "58ch" }}>
            <div
              style={{
                ...sectionEyebrow,
                color: "rgba(253,251,246,0.5)",
              }}
            >
              02 — Uthyrning
            </div>
            <h2
              style={{
                fontSize: 36,
                color: "var(--ljus)",
                margin: "0 0 10px",
              }}
            >
              Maskinuthyrning
            </h2>
            <p
              style={{
                color: "rgba(253,251,246,0.8)",
                fontSize: 16,
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              Hyr kombihammare, kapmaskin, betongslip, jordfräs med mera — hämta
              på plats på Öckerö.
            </p>
          </div>
          <Link
            href="/uthyrning"
            className="btn btn-light"
            style={{ fontSize: 15.5, padding: "14px 26px", whiteSpace: "nowrap" }}
          >
            Se maskiner
          </Link>
        </div>
      </Reveal>

      {/* ── 03 — Tullhuset / Ejder ── */}
      <Reveal
        style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 28px 90px" }}
      >
        <div style={sectionEyebrow}>03 — Ute på öarna</div>
        <h2 style={{ fontSize: 46, margin: "0 0 34px" }}>Gjutet på Öckerö</h2>
        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              minHeight: 380,
              position: "relative",
            }}
          >
            <HeroVideo src="/assets/Hero%20vid.mp4" />
            <div
              style={{
                position: "absolute",
                left: 14,
                bottom: 14,
                background: "rgba(18,32,38,0.55)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                color: "var(--ljus)",
                fontSize: 12.5,
                letterSpacing: "0.08em",
                padding: "7px 13px",
                borderRadius: 7,
              }}
            >
              Vår gård vid havet
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                background: "var(--sand)",
                borderRadius: 14,
                padding: "34px 36px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7A7361",
                  marginBottom: 10,
                }}
              >
                Se oss ute på öarna
              </div>
              <p
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: 25,
                  lineHeight: 1.3,
                  margin: "0 0 12px",
                  color: "var(--ink)",
                }}
              >
                Våra fina bord, bänkar, krukor och fyr finner ni hos Tullhuset!
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                Utanför betel står gigantfyren och bänk med kullersten! På
                stenpiren ligger våra ejdrar uppradade!
              </p>
            </div>
            <div
              style={{
                background: "var(--paper)",
                border: "1px solid var(--kant)",
                borderRadius: 14,
                padding: "26px 30px",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 74,
                  height: 74,
                  flex: "none",
                  borderRadius: 10,
                  backgroundImage: `url('${EJDER_IMG}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: 16.5 }}>Ejder 400 kg</div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>
                  Den fina trafikavstängaren — gjuten på Öckerö.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Leverantörsstrip (djupblått band, förankrar sidfoten) ── */}
      <div
        style={{
          marginTop: 40,
          marginBottom: -1,
          background: "#1B3039",
        }}
      >
        <Wave fill="#22404B" />
        <div
          style={{
            background:
              "linear-gradient(180deg, #22404B 0%, #1B3039 100%)",
          }}
        >
          <div
            className="container"
            style={{
              padding: "48px 28px 60px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(253,251,246,0.55)",
                flex: "none",
              }}
            >
              Våra leverantörer
            </div>
            <div
              style={{
                display: "flex",
                gap: 30,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Link href="/vara-leverantorer" className="lev-strip lev-strip-dark">Se våra leverantörer och produktområden →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: 8,
};

const sectionEyebrow: React.CSSProperties = {
  fontSize: 11.5,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#8A968F",
  marginBottom: 10,
};
