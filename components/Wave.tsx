/**
 * Mjuk vågform som övergång mellan sektioner. `fill` = färgen på ytan man
 * går NER i. `flip` vänder vågen (för att avsluta ett band nedtill).
 */
export default function Wave({
  fill,
  flip = false,
  height = 48,
}: {
  fill: string;
  flip?: boolean;
  height?: number;
}) {
  return (
    <div className="wave" style={{ height, transform: flip ? "scaleY(-1)" : undefined }} aria-hidden>
      <svg viewBox="0 0 1200 48" preserveAspectRatio="none">
        <path
          d="M0,24 C150,48 350,0 600,20 C820,37 1000,52 1200,20 L1200,48 L0,48 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
