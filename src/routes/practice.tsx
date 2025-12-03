import { Lightbulb } from "lucide-react";
import { CASE_RECOGNITION, COMMON_MISTAKES } from "../constants/recognition";
import { Badge, Card, InfoBox, MonoText } from "../components/ui";

export function meta() {
  return [
    { title: "Case Recognition Tips - Greek Conjugation Reference" },
    { name: "description", content: "Pattern recognition tips for Greek grammatical cases" },
  ];
}

export default function CasePracticeRoute() {
  return (
    <div className="space-y-10">
      {/* Common Mistakes - Critical for Learning */}
      <Card
        variant="bordered"
        padding="lg"
        className="bg-red-50 border-red-200"
      >
        <h2 className="text-xl font-bold mb-6 text-red-800 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          Avoid These Common Mistakes
        </h2>
        <InfoBox variant="error" title="Learning Tip" className="mb-6">
          These are the most frequent errors Greek learners make. Study these
          carefully to avoid bad habits!
        </InfoBox>

        <div className="space-y-4">
          {COMMON_MISTAKES.map((mistake, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
              <div className="grid md:grid-cols-2 gap-4 mb-2">
                <div>
                  <div className="text-red-600 font-semibold text-sm mb-1">
                    ❌ Wrong:
                  </div>
                  <MonoText variant="error" size="lg">
                    {mistake.wrong}
                  </MonoText>
                </div>
                <div>
                  <div className="text-green-600 font-semibold text-sm mb-1">
                    ✅ Correct:
                  </div>
                  <MonoText variant="success" size="lg">
                    {mistake.correct}
                  </MonoText>
                </div>
              </div>
              <div className="text-sm text-gray-600 italic">
                {mistake.explanation}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Recognition Tips */}
      <Card
        variant="elevated"
        padding="lg"
        className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
          🔍 Quick Recognition Tips
        </h2>
        <InfoBox variant="info" title="Pattern Recognition" className="mb-8">
          Learn to spot cases quickly with these visual and contextual clues!
        </InfoBox>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Visual Shortcuts */}
          <Card
            variant="bordered"
            padding="lg"
            className="border-blue-200 bg-blue-50/30"
          >
            <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center gap-2">
              👁️ Visual Shortcuts
            </h3>
            <div className="space-y-4">
              <InfoBox variant="info" size="sm" title="🎯 Ending Patterns">
                <div className="space-y-2">
                  <div className="p-2 bg-blue-100 rounded">
                    <div className="text-xs font-semibold text-blue-700">
                      -ν endings often = accusative
                    </div>
                    <div className="text-xs">
                      τον, την, των (masculine/feminine accusative)
                    </div>
                  </div>
                  <div className="p-2 bg-blue-100 rounded">
                    <div className="text-xs font-semibold text-blue-700">
                      -ς endings often = genitive
                    </div>
                    <div className="text-xs">της, του (genitive forms)</div>
                  </div>
                </div>
              </InfoBox>

              <InfoBox variant="info" size="sm" title="⚡ Context Clues">
                <div className="space-y-2">
                  <div className="p-2 bg-blue-100 rounded">
                    <div className="text-xs font-semibold text-blue-700">
                      After action verbs = accusative
                    </div>
                    <div className="text-xs">"I see THE..." = τον/την/το</div>
                  </div>
                  <div className="p-2 bg-blue-100 rounded">
                    <div className="text-xs font-semibold text-blue-700">
                      Possession words = genitive
                    </div>
                    <div className="text-xs">"Mary's car" = του/της + noun</div>
                  </div>
                </div>
              </InfoBox>
            </div>
          </Card>

          {/* Memory Devices */}
          <Card
            variant="bordered"
            padding="lg"
            className="border-green-200 bg-green-50/30"
          >
            <h3 className="text-lg font-bold mb-4 text-green-700 flex items-center gap-2">
              🧠 Memory Devices
            </h3>
            <div className="space-y-4">
              <InfoBox
                variant="success"
                size="sm"
                title="🎵 WHO/WHAT/WHERE Framework"
              >
                <div className="space-y-2">
                  <div className="p-2 bg-green-100 rounded">
                    <div className="text-xs font-semibold text-green-700">
                      WHO does it? → Nominative
                    </div>
                    <div className="text-xs">Ο άντρας (the man does...)</div>
                  </div>
                  <div className="p-2 bg-green-100 rounded">
                    <div className="text-xs font-semibold text-green-700">
                      WHAT/WHERE to? → Accusative
                    </div>
                    <div className="text-xs">
                      τον καφέ (the coffee), στο σπίτι (to house)
                    </div>
                  </div>
                  <div className="p-2 bg-green-100 rounded">
                    <div className="text-xs font-semibold text-green-700">
                      WHOSE is it? → Genitive
                    </div>
                    <div className="text-xs">της μητέρας (of the mother)</div>
                  </div>
                </div>
              </InfoBox>

              <InfoBox variant="success" size="sm" title="🔗 Word Associations">
                <div className="space-y-2">
                  <div className="p-2 bg-green-100 rounded">
                    <div className="text-xs font-semibold text-green-700">
                      Accusative = "Action target"
                    </div>
                    <div className="text-xs">Think: "I act ON something"</div>
                  </div>
                  <div className="p-2 bg-green-100 rounded">
                    <div className="text-xs font-semibold text-green-700">
                      Genitive = "Generation/belonging"
                    </div>
                    <div className="text-xs">
                      Think: "Generated from someone"
                    </div>
                  </div>
                </div>
              </InfoBox>
            </div>
          </Card>
        </div>
      </Card>

      {/* Advanced Pattern Recognition */}
      <Card
        variant="bordered"
        padding="lg"
        className="border-cyan-200 bg-cyan-50/30"
      >
        <h2 className="text-xl font-bold mb-6 text-cyan-700 flex items-center gap-2">
          🎓 Advanced Recognition Patterns
        </h2>
        <InfoBox variant="info" title="For Advanced Learners" className="mb-6">
          These patterns help identify cases in complex sentences and formal
          Greek.
        </InfoBox>

        <div className="space-y-4">
          {CASE_RECOGNITION.patterns.map((pattern, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg border border-cyan-200 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-semibold text-cyan-800">
                  {pattern.pattern}
                </div>
                <Badge variant="secondary" size="sm">
                  Advanced
                </Badge>
              </div>
              <div className="text-sm text-cyan-600 mb-3">{pattern.rule}</div>
              <div className="text-xs flex flex-wrap gap-2">
                {pattern.examples.map((ex) => (
                  <MonoText
                    key={ex}
                    variant="secondary"
                    size="xs"
                    className="bg-cyan-100 px-2 py-1 rounded"
                  >
                    {ex}
                  </MonoText>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Practice Strategy */}
      <Card
        variant="elevated"
        padding="lg"
        className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">
          🎯 Practice Strategy
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            variant="bordered"
            padding="lg"
            className="border-purple-200 bg-purple-50/50"
          >
            <h3 className="text-lg font-bold mb-3 text-purple-700">
              Step 1: Foundation
            </h3>
            <div className="space-y-2 text-sm">
              <div>• Master WHO/WHAT/WHERE framework</div>
              <div>• Practice with coffee, house, family examples</div>
              <div>• Focus on τον/την/το patterns</div>
            </div>
          </Card>

          <Card
            variant="bordered"
            padding="lg"
            className="border-pink-200 bg-pink-50/50"
          >
            <h3 className="text-lg font-bold mb-3 text-pink-700">
              Step 2: Recognition
            </h3>
            <div className="space-y-2 text-sm">
              <div>• Spot -ν and -ς endings</div>
              <div>• Use context clues (action verbs, possession)</div>
              <div>• Practice with preposition patterns</div>
            </div>
          </Card>

          <Card
            variant="bordered"
            padding="lg"
            className="border-indigo-200 bg-indigo-50/50"
          >
            <h3 className="text-lg font-bold mb-3 text-indigo-700">
              Step 3: Mastery
            </h3>
            <div className="space-y-2 text-sm">
              <div>• Read full sentences</div>
              <div>• Identify all article forms quickly</div>
              <div>• Handle complex constructions</div>
            </div>
          </Card>
        </div>

        <InfoBox
          variant="warning"
          title="Remember"
          icon={<Lightbulb size={20} />}
          className="mt-6"
        >
          Don't try to memorize everything at once! Start with the
          WHO/WHAT/WHERE framework and practice with daily examples. The
          patterns will become automatic with time.
        </InfoBox>
      </Card>
    </div>
  );
}
