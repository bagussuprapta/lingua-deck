"use client";

import { useEffect, useState } from "react";
import { encode } from "plantuml-encoder";

function PlantUMLFromFile({ filePath }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchPUML() {
      const res = await fetch(filePath);
      const text = await res.text();

      const encoded = encode(text);
      const url = `https://www.plantuml.com/plantuml/svg/${encoded}`;
      setImageUrl(url);
    }

    fetchPUML();
  }, [filePath]);

  if (!imageUrl) return <p>Loading diagram...</p>;

  return <img src={imageUrl} alt="PlantUML Diagram" />;
}

export default function DiagramPage() {
  return (
    <div className="p-2 px-14">
      <PlantUMLFromFile filePath="/entity-diagram.puml" />
    </div>
  );
}
