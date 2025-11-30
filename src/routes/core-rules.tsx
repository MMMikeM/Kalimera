import CoreRules from "../components/CoreRules";

export function meta() {
  return [
    { title: "Core Rules - Greek Conjugation Reference" },
    { name: "description", content: "Fundamental Greek grammar rules and patterns" },
  ];
}

export default function CoreRulesRoute() {
  return <CoreRules />;
}
