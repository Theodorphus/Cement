"use client";

import { useEffect, useState } from "react";

export default function BarncancerfondenWidget() {
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    // Same image endpoint and cache busting as Compileit's widget script.
    // React owns the image so client-side navigation also initializes it.
    const company = encodeURIComponent("Öckerö Cementgjuteri AB".toLowerCase());
    const date = encodeURIComponent(new Date().toString());
    setImageUrl(`https://tmafiler.barncancerfonden.se/BCF-widget/companies/${company}/barncancerfonden-widget?date=${date}`);
  }, []);

  return (
    <div className="barncancerfonden-widget" data-bcf-business-id="Öckerö Cementgjuteri AB" data-widget-language="sv">
      <a href="https://www.barncancerfonden.se" target="_blank" rel="noopener noreferrer" aria-label="Vi stödjer Barncancerfonden (öppnas i ny flik)">
        {imageUrl && (
          // The provider serves the current supporter badge dynamically.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="Vi stödjer Barncancerfonden" />
        )}
      </a>
    </div>
  );
}
