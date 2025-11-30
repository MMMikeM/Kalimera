import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

startTransition(() => {
  hydrateRoot(
    root,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
});
