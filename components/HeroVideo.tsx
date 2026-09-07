export default function HeroVideo({ src }: { src: string }) {
  return <video controls playsInline preload="none" poster="/assets/Butik.jpg" src={src} aria-label="Film från Öckerö Cementgjuteri" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
}

