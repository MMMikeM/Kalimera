import EssentialWords from "../components/EssentialWords";

export function meta() {
  return [
    { title: "Essential Words - Greek Conjugation Reference" },
    { name: "description", content: "Essential Greek vocabulary and word lists" },
  ];
}

export default function VocabularyRoute() {
  return <EssentialWords />;
}
