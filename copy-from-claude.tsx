import React, { useState } from 'react';
import { Search, BookOpen, Users, Clock, FileText, Lightbulb } from 'lucide-react';

const GreekReference = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [searchTerm, setSearchTerm] = useState('');

  // Standardized table component
  const StandardTable = ({ headers, rows, className = "", headerColors = [] }) => (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse border border-gray-300 ${className}`}>
        {headers && (
          <thead>
            <tr className="bg-gray-100">
              {headers.map((header, idx) => (
                <th 
                  key={idx} 
                  className={`border border-gray-300 p-3 text-center font-semibold ${headerColors[idx] || ''}`}
                  style={{ width: `${100/headers.length}%` }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50">
              {row.map((cell, cellIdx) => (
                <td 
                  key={cellIdx} 
                  className="border border-gray-300 p-3 text-center"
                  style={{ width: `${100/row.length}%` }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const tabs = [
    { id: 'articles', label: 'Articles & Cases', icon: <FileText size={16} /> },
    { id: 'present', label: 'Present Tense', icon: <Users size={16} /> },
    { id: 'other-tenses', label: 'Other Tenses', icon: <Clock size={16} /> },
    { id: 'vocabulary', label: 'Essential Words', icon: <BookOpen size={16} /> },
    { id: 'search', label: 'Quick Search', icon: <Search size={16} /> }
  ];

  const ArticlesContent = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <h3 className="font-bold text-blue-800 flex items-center gap-2">
          <Lightbulb size={16} />
          The "Tin Tis Toun" Mystery Solved!
        </h3>
        <p className="text-blue-700 mt-2">
          These are all forms of "the" - they change based on gender, number, and case!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-3">Definite Article "The"</h3>
          <StandardTable 
            headers={["Case", "Masculine", "Feminine", "Neuter"]}
            headerColors={["", "text-blue-600", "text-pink-600", "text-green-600"]}
            rows={[
              ["Nom (subject)", <span className="text-blue-600 font-mono">ο</span>, <span className="text-pink-600 font-mono">η</span>, <span className="text-green-600 font-mono">το</span>],
              ["Acc (object)", <span className="text-blue-600 font-mono">τον/το(ν)</span>, <span className="text-pink-600 font-mono">την/τη(ν)</span>, <span className="text-green-600 font-mono">το</span>],
              ["Gen (of/possession)", <span className="text-blue-600 font-mono">του</span>, <span className="text-pink-600 font-mono">της</span>, <span className="text-green-600 font-mono">του</span>]
            ]}
          />
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Plural Forms</h3>
          <StandardTable 
            headers={["Case", "Masculine", "Feminine", "Neuter"]}
            headerColors={["", "text-blue-600", "text-pink-600", "text-green-600"]}
            rows={[
              ["Nom", <span className="text-blue-600 font-mono">οι</span>, <span className="text-pink-600 font-mono">οι</span>, <span className="text-green-600 font-mono">τα</span>],
              ["Acc", <span className="text-blue-600 font-mono">τους</span>, <span className="text-pink-600 font-mono">τις</span>, <span className="text-green-600 font-mono">τα</span>],
              ["Gen", <span className="text-blue-600 font-mono">των</span>, <span className="text-pink-600 font-mono">των</span>, <span className="text-green-600 font-mono">των</span>]
            ]}
          />
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-bold text-yellow-800 mb-2">🧠 Memory Aid: The "ν" Rule</h4>
        <p className="text-yellow-700">
          Add "ν" to τον/την/το when the next word starts with: vowel, κ, π, τ, ξ, ψ, γκ, μπ, ντ
        </p>
        <p className="text-yellow-700 mt-1">
          <strong>Examples:</strong> τον άντρα (ton andra), την ώρα (tin ora)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-bold text-green-800">✅ When to use Accusative</h4>
          <ul className="text-green-700 mt-2 space-y-1">
            <li>• Direct object: "I see <em>the man</em>"</li>
            <li>• After prepositions: "to <em>the house</em>"</li>
            <li>• Time expressions: "on <em>Monday</em>"</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-bold text-blue-800">✅ When to use Nominative</h4>
          <ul className="text-blue-700 mt-2 space-y-1">
            <li>• Subject: "<em>The man</em> is tall"</li>
            <li>• After "to be": "He is <em>a teacher</em>"</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const PresentTenseContent = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
        <h3 className="font-bold text-purple-800 flex items-center gap-2">
          <Lightbulb size={16} />
          Two Main Families
        </h3>
        <p className="text-purple-700 mt-2">
          Almost every Greek verb fits into one of these two patterns!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-bold mb-3 text-blue-600">Family 1: Active (-ω verbs)</h3>
          
          <div className="bg-blue-50 p-3 rounded mb-4">
            <h4 className="font-bold">🎵 The Rhythm:</h4>
            <p className="font-mono text-lg">-ω, -εις, -ει, -ουμε, -ετε, -ουν(ε)</p>
          </div>

          <h4 className="font-semibold mb-2">Type A: κάνω (I do) - stress on stem</h4>
          <StandardTable 
            rows={[
              ["εγώ", <span className="font-mono">κάν<span className="bg-blue-200">ω</span></span>, "I do"],
              ["εσύ", <span className="font-mono">κάν<span className="bg-blue-200">εις</span></span>, "you do"],
              ["αυτός", <span className="font-mono">κάν<span className="bg-blue-200">ει</span></span>, "he does"],
              ["εμείς", <span className="font-mono">κάν<span className="bg-blue-200">ουμε</span></span>, "we do"],
              ["εσείς", <span className="font-mono">κάν<span className="bg-blue-200">ετε</span></span>, "you do"],
              ["αυτοί", <span className="font-mono">κάν<span className="bg-blue-200">ουν</span></span>, "they do"]
            ]}
            className="mb-4"
          />

          <h4 className="font-semibold mb-2">Type B: μιλάω (I speak) - stress on ending</h4>
          <StandardTable 
            rows={[
              ["εγώ", <span className="font-mono">μιλ<span className="bg-blue-200">άω</span></span>, "I speak"],
              ["εσύ", <span className="font-mono">μιλ<span className="bg-blue-200">άς</span></span>, "you speak"],
              ["αυτός", <span className="font-mono">μιλ<span className="bg-blue-200">άει</span></span>, "he speaks"],
              ["εμείς", <span className="font-mono">μιλ<span className="bg-blue-200">άμε</span></span>, "we speak"],
              ["εσείς", <span className="font-mono">μιλ<span className="bg-blue-200">άτε</span></span>, "you speak"],
              ["αυτοί", <span className="font-mono">μιλ<span className="bg-blue-200">άνε</span></span>, "they speak"]
            ]}
          />
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-bold mb-3 text-green-600">Family 2: Passive (-ομαι verbs)</h3>
          
          <div className="bg-green-50 p-3 rounded mb-4">
            <h4 className="font-bold">🎵 The Rhythm:</h4>
            <p className="font-mono text-lg">-ομαι, -εσαι, -εται, -όμαστε, -εστε, -ονται</p>
          </div>

          <h4 className="font-semibold mb-2">Type A: έρχομαι (I come)</h4>
          <StandardTable 
            rows={[
              ["εγώ", <span className="font-mono">έρχ<span className="bg-green-200">ομαι</span></span>, "I come"],
              ["εσύ", <span className="font-mono">έρχ<span className="bg-green-200">εσαι</span></span>, "you come"],
              ["αυτός", <span className="font-mono">έρχ<span className="bg-green-200">εται</span></span>, "he comes"],
              ["εμείς", <span className="font-mono">ερχ<span className="bg-green-200">όμαστε</span></span>, "we come"],
              ["εσείς", <span className="font-mono">έρχ<span className="bg-green-200">εστε</span></span>, "you come"],
              ["αυτοί", <span className="font-mono">έρχ<span className="bg-green-200">ονται</span></span>, "they come"]
            ]}
            className="mb-4"
          />

          <h4 className="font-semibold mb-2">Type B: θυμάμαι (I remember)</h4>
          <StandardTable 
            rows={[
              ["εγώ", <span className="font-mono">θυμ<span className="bg-green-200">άμαι</span></span>, "I remember"],
              ["εσύ", <span className="font-mono">θυμ<span className="bg-green-200">άσαι</span></span>, "you remember"],
              ["αυτός", <span className="font-mono">θυμ<span className="bg-green-200">άται</span></span>, "he remembers"],
              ["εμείς", <span className="font-mono">θυμ<span className="bg-green-200">όμαστε</span></span>, "we remember"],
              ["εσείς", <span className="font-mono">θυμ<span className="bg-green-200">άστε</span></span>, "you remember"],
              ["αυτοί", <span className="font-mono">θυμ<span className="bg-green-200">ούνται</span></span>, "they remember"]
            ]}
          />
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg">
        <h4 className="font-bold text-orange-800 mb-2">🧠 Memory Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-orange-700">
          <div>
            <p><strong>Active verbs (-ω):</strong> Someone DOES something</p>
            <p><strong>Passive verbs (-ομαι):</strong> Look passive but often mean active actions</p>
          </div>
          <div>
            <p><strong>Pattern recognition:</strong> Learn the "I" form (εγώ) and you know the family!</p>
            <p><strong>έρχομαι = -ομαι family</strong></p>
            <p><strong>κάνω = -ω family</strong></p>
          </div>
        </div>
      </div>

      <div className="bg-red-50 p-4 rounded-lg">
        <h4 className="font-bold text-red-800 mb-2">⚡ Irregular Verbs - Must Memorize!</h4>
        <div className="bg-red-100 p-2 rounded mb-3">
          <p className="text-sm text-red-700">These don't follow the standard patterns - learn them individually!</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h5 className="font-semibold mb-2">πάω (I go)</h5>
            <StandardTable 
              rows={[
                ["εγώ", <span className="font-mono">πάω</span>, "I go"],
                ["εσύ", <span className="font-mono">πας</span>, "you go"],
                ["αυτός", <span className="font-mono">πάει</span>, "he goes"],
                ["εμείς", <span className="font-mono">πάμε</span>, "we go"],
                ["εσείς", <span className="font-mono">πάτε</span>, "you go"],
                ["αυτοί", <span className="font-mono">πάνε</span>, "they go"]
              ]}
            />
          </div>
          
          <div>
            <h5 className="font-semibold mb-2">λέω (I say)</h5>
            <StandardTable 
              rows={[
                ["εγώ", <span className="font-mono">λέω</span>, "I say"],
                ["εσύ", <span className="font-mono">λες</span>, "you say"],
                ["αυτός", <span className="font-mono">λέει</span>, "he says"],
                ["εμείς", <span className="font-mono">λέμε</span>, "we say"],
                ["εσείς", <span className="font-mono">λέτε</span>, "you say"],
                ["αυτοί", <span className="font-mono">λένε</span>, "they say"]
              ]}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h5 className="font-semibold mb-2">τρώω (I eat) - drops ω</h5>
            <StandardTable 
              rows={[
                ["εγώ", <span className="font-mono">τρώω</span>, "I eat"],
                ["εσύ", <span className="font-mono">τρώς</span>, "you eat"],
                ["αυτός", <span className="font-mono">τρώει</span>, "he eats"],
                ["εμείς", <span className="font-mono">τρώμε</span>, "we eat"],
                ["εσείς", <span className="font-mono">τρώτε</span>, "you eat"],
                ["αυτοί", <span className="font-mono">τρώνε</span>, "they eat"]
              ]}
            />
          </div>
          
          <div>
            <h5 className="font-semibold mb-2">είμαι (I am)</h5>
            <StandardTable 
              rows={[
                ["εγώ", <span className="font-mono">είμαι</span>, "I am"],
                ["εσύ", <span className="font-mono">είσαι</span>, "you are"],
                ["αυτός", <span className="font-mono">είναι</span>, "he is"],
                ["εμείς", <span className="font-mono">είμαστε</span>, "we are"],
                ["εσείς", <span className="font-mono">είστε</span>, "you are"],
                ["αυτοί", <span className="font-mono">είναι</span>, "they are"]
              ]}
            />
          </div>
        </div>

        <div className="bg-orange-100 p-3 rounded">
          <h6 className="font-bold text-orange-800 mb-2">🧠 Memory Notes:</h6>
          <div className="text-sm text-orange-700 space-y-1">
            <p><strong>πάω:</strong> Alternative form is πηγαίνω (follows normal Type A pattern)</p>
            <p><strong>λέω:</strong> Notice how it drops the final ω in most forms</p>
            <p><strong>τρώω:</strong> Similar to λέω - drops the final ω</p>
            <p><strong>τα λέμε:</strong> "see ya later" (literally "we say them")</p>
          </div>
        </div>
      </div>
    </div>
  );

  const OtherTensesContent = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
        <h3 className="font-bold text-indigo-800">Future Reference - Key Patterns</h3>
        <p className="text-indigo-700 mt-2">
          These follow the same base patterns as present tense, just with different markers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-bold mb-3">Simple Future (θα + present)</h3>
          <div className="bg-blue-50 p-3 rounded mb-3">
            <p><strong>Formula:</strong> θα + present tense forms</p>
          </div>
          <StandardTable 
            headers={["Person", "θα κάνω", "English"]}
            rows={[
              ["εγώ", "θα κάνω", "I will do"],
              ["εσύ", "θα κάνεις", "you will do"],
              ["αυτός", "θα κάνει", "he will do"],
              ["εμείς", "θα κάνουμε", "we will do"],
              ["εσείς", "θα κάνετε", "you will do"],
              ["αυτοί", "θα κάνουν", "they will do"]
            ]}
          />
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-bold mb-3">Past Simple - Basic Pattern</h3>
          <div className="bg-green-50 p-3 rounded mb-3">
            <p><strong>Key:</strong> Often starts with έ- and changes endings</p>
          </div>
          <StandardTable 
            headers={["Person", "έκανα", "English"]}
            rows={[
              ["εγώ", "έκανα", "I did"],
              ["εσύ", "έκανες", "you did"],
              ["αυτός", "έκανε", "he did"],
              ["εμείς", "κάναμε", "we did"],
              ["εσείς", "κάνατε", "you did"],
              ["αυτοί", "έκαναν", "they did"]
            ]}
          />
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-bold text-yellow-800 mb-2">🎯 Focus on Present First!</h4>
        <p className="text-yellow-700">
          Master the present tense patterns before diving deep into other tenses. 
          The same verb families apply - just with different time markers.
        </p>
      </div>
    </div>
  );

  const VocabularyContent = () => {
    const verbCategories = [
      {
        title: "Essential -ω Verbs",
        verbs: [
          { greek: "κάνω", english: "to do/make", pattern: "Type A" },
          { greek: "θέλω", english: "to want", pattern: "Type A" },
          { greek: "μπορώ", english: "to can/be able", pattern: "Type A" },
          { greek: "βλέπω", english: "to see", pattern: "Type A" },
          { greek: "ακούω", english: "to hear", pattern: "Type A" },
          { greek: "μένω", english: "to stay/live", pattern: "Type A" },
          { greek: "οδηγώ", english: "to drive", pattern: "Type A" },
          { greek: "ζω", english: "to live", pattern: "Type A" },
          { greek: "αργώ", english: "to be late", pattern: "Type A" },
          { greek: "τηλεφωνώ", english: "to phone", pattern: "Type A" },
          { greek: "φεύγω", english: "to leave", pattern: "Type A" },
          { greek: "περιμένω", english: "to wait", pattern: "Type A" },
          { greek: "παίρνω", english: "to take", pattern: "Type A" },
          { greek: "ξυπνάω", english: "to wake up", pattern: "Type B" },
          { greek: "μιλάω", english: "to speak", pattern: "Type B" },
          { greek: "αγαπώ", english: "to love", pattern: "Type B" },
          { greek: "κολυμπάω", english: "to swim", pattern: "Type B" },
          { greek: "φοράω", english: "to wear", pattern: "Type B" },
          { greek: "ξεκινάω", english: "to start/depart", pattern: "Type B" },
          { greek: "περνάω", english: "to cross/spend", pattern: "Type B" },
          { greek: "δουλεύω", english: "to work", pattern: "Type B" }
        ]
      },
      {
        title: "Essential -ομαι Verbs",
        verbs: [
          { greek: "έρχομαι", english: "to come", pattern: "Type A" },
          { greek: "γίνομαι", english: "to become", pattern: "Type A" },
          { greek: "σκέφτομαι", english: "to think", pattern: "Type A" },
          { greek: "θυμάμαι", english: "to remember", pattern: "Type B" },
          { greek: "κοιμάμαι", english: "to sleep", pattern: "Type B" },
          { greek: "λυπάμαι", english: "to feel sorry", pattern: "Type B" },
          { greek: "φοβάμαι", english: "to be afraid", pattern: "Type B" }
        ]
      },
      {
        title: "Irregular Verbs ⚡",
        verbs: [
          { greek: "είμαι", english: "to be", pattern: "Irregular" },
          { greek: "πάω", english: "to go", pattern: "Irregular" },
          { greek: "λέω", english: "to say", pattern: "Irregular" },
          { greek: "τρώω", english: "to eat", pattern: "Irregular" },
          { greek: "πηγαίνω", english: "to go (regular form)", pattern: "Type A" }
        ]
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
          <h3 className="font-bold text-green-800">Quick Verb Reference</h3>
          <p className="text-green-700 mt-2">
            From your Greek learning materials - organized by conjugation pattern.
          </p>
        </div>

        {verbCategories.map((category, idx) => (
          <div key={idx} className="border rounded-lg p-4">
            <h3 className="text-lg font-bold mb-3">{category.title}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {category.verbs.map((verb, verbIdx) => (
                <div key={verbIdx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-mono text-lg">{verb.greek}</span>
                    <span className="text-gray-600 ml-2">{verb.english}</span>
                  </div>
                  <span className="text-xs bg-blue-100 px-2 py-1 rounded">{verb.pattern}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="border rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold mb-3">Telling Time - Τι ώρα είναι;</h3>
          <div className="bg-blue-50 p-3 rounded mb-3">
            <p className="text-sm text-blue-700"><strong>🕐 Pattern:</strong> Είναι + time / Η ώρα είναι + time</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold mb-2">Basic Time Structure</h5>
              <div className="space-y-1 text-sm">
                <div><span className="font-mono">είναι μία</span> - it's one o'clock</div>
                <div><span className="font-mono">είναι δύο</span> - it's two o'clock</div>
                <div><span className="font-mono">είναι μία ακριβώς</span> - it's exactly one</div>
                <div><span className="font-mono">τι ώρα είναι;</span> - what time is it?</div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Minutes & Fractions</h5>
              <div className="space-y-1 text-sm">
                <div><span className="font-mono">και τέταρτο</span> - quarter past</div>
                <div><span className="font-mono">και μισή</span> - half past</div>
                <div><span className="font-mono">παρά τέταρτο</span> - quarter to</div>
                <div><span className="font-mono">παρά πέντε</span> - five to</div>
                <div><span className="font-mono">και είκοσι πέντε</span> - twenty-five past</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded mt-3">
            <p className="text-sm text-green-700"><strong>🕒 "At" times:</strong> στη μία (at one), στις τρεις (at three), στις τέσσερις (at four)</p>
          </div>
        </div>

        <div className="border rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold mb-3">Times of Day</h3>
          <div className="grid md:grid-cols-5 gap-2 text-sm">
            <div className="text-center">
              <div className="font-mono text-lg">πρωί</div>
              <div className="text-gray-600">morning</div>
              <div className="text-xs">(5:00-12:00)</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-lg">μεσημέρι</div>
              <div className="text-gray-600">midday</div>
              <div className="text-xs">(12:00-15:00)</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-lg">απόγευμα</div>
              <div className="text-gray-600">afternoon</div>
              <div className="text-xs">(15:00-19:00)</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-lg">βράδυ</div>
              <div className="text-gray-600">evening</div>
              <div className="text-xs">(19:00-24:00)</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-lg">νύχτα</div>
              <div className="text-gray-600">night</div>
              <div className="text-xs">(24:00-5:00)</div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold mb-3">Transportation Vocabulary</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold mb-2">Vehicles</h5>
              <div className="space-y-1 text-sm">
                <div><span className="font-mono">το τρένο</span> - train</div>
                <div><span className="font-mono">το ταξί</span> - taxi</div>
                <div><span className="font-mono">ο ταξιτζής</span> - taxi driver</div>
                <div><span className="font-mono">το αεροπλάνο</span> - airplane</div>
                <div><span className="font-mono">το τρόλεϊ</span> - trolley</div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Actions</h5>
              <div className="space-y-1 text-sm">
                <div><span className="font-mono">ξεκινάει</span> - departs/starts</div>
                <div><span className="font-mono">φεύγει</span> - leaves</div>
                <div><span className="font-mono">περιμένει</span> - waits</div>
                <div><span className="font-mono">παίρνω</span> - I take</div>
                <div><span className="font-mono">δουλεύει</span> - works</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold mb-3">Adverbs of Frequency</h3>
          <div className="bg-yellow-50 p-3 rounded mb-3">
            <p className="text-sm text-yellow-700"><strong>🧠 Remember:</strong> ποτέ = never, πότε = when (question)</p>
          </div>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <div className="space-y-1">
              <div><span className="font-mono">ποτέ</span> - never</div>
              <div><span className="font-mono">σχεδόν ποτέ</span> - almost never</div>
              <div><span className="font-mono">σπάνια</span> - rarely</div>
              <div><span className="font-mono">καμιά φορά</span> - sometimes</div>
              <div><span className="font-mono">κάπου κάπου</span> - from time to time</div>
              <div><span className="font-mono">πότε πότε</span> - occasionally</div>
            </div>
            <div className="space-y-1">
              <div><span className="font-mono">μερικές φορές</span> - sometimes</div>
              <div><span className="font-mono">συχνά</span> - often</div>
              <div><span className="font-mono">πολλές φορές</span> - many times</div>
              <div><span className="font-mono">συνήθως</span> - usually</div>
              <div><span className="font-mono">σχεδόν πάντα</span> - almost always</div>
              <div><span className="font-mono">πάντα</span> - always</div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold mb-3">Likes Construction - μου αρέσει/αρέσουν</h3>
          <div className="bg-blue-50 p-3 rounded mb-3">
            <p className="text-sm text-blue-700"><strong>Pattern:</strong> [Person] αρέσει (for one thing) / αρέσουν (for many things)</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold mb-2">Single thing (αρέσει)</h5>
              <div className="space-y-1 text-sm">
                <div><span className="font-mono">μου αρέσει</span> - I like</div>
                <div><span className="font-mono">σου αρέσει</span> - you like</div>
                <div><span className="font-mono">του/της αρέσει</span> - he/she likes</div>
                <div><span className="font-mono">μας αρέσει</span> - we like</div>
                <div><span className="font-mono">σας αρέσει</span> - you like</div>
                <div><span className="font-mono">τους αρέσει</span> - they like</div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Multiple things (αρέσουν)</h5>
              <div className="space-y-1 text-sm">
                <div><span className="font-mono">μου αρέσουν</span> - I like (them)</div>
                <div><span className="font-mono">σου αρέσουν</span> - you like (them)</div>
                <div><span className="font-mono">του/της αρέσουν</span> - he/she likes (them)</div>
                <div><span className="font-mono">μας αρέσουν</span> - we like (them)</div>
                <div><span className="font-mono">σας αρέσουν</span> - you like (them)</div>
                <div><span className="font-mono">τους αρέσουν</span> - they like (them)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-bold mb-2">Summer & Beach Vocabulary</h4>
            <div className="space-y-1 text-sm">
              <div><span className="font-mono">το καλοκαίρι</span> - summer</div>
              <div><span className="font-mono">η θάλασσα</span> - sea</div>
              <div><span className="font-mono">η παραλία</span> - beach</div>
              <div><span className="font-mono">ο ήλιος</span> - sun</div>
              <div><span className="font-mono">η ζέστη</span> - warmth</div>
              <div><span className="font-mono">το μαγιό</span> - swimming costume</div>
              <div><span className="font-mono">το καπέλο</span> - hat</div>
              <div><span className="font-mono">η ξαπλώστρα</span> - sunbed</div>
              <div><span className="font-mono">το παγωτό</span> - ice cream</div>
              <div><span className="font-mono">το καρπούζι</span> - watermelon</div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-bold mb-2">Time Expressions</h4>
            <div className="space-y-1 text-sm">
              <div><span className="font-mono">κάθε μέρα</span> - every day</div>
              <div><span className="font-mono">η μέρα</span> - day</div>
              <div><span className="font-mono">το μεσημέρι</span> - midday</div>
              <div><span className="font-mono">το απόγευμα</span> - afternoon</div>
              <div><span className="font-mono">το βράδυ</span> - evening</div>
              <div><span className="font-mono">η νύχτα</span> - night</div>
              <div><span className="font-mono">οι διακοπές</span> - holidays</div>
              <div><span className="font-mono">το ταξίδι</span> - journey/trip</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-bold mb-2">Numbers (1-10)</h4>
            <div className="space-y-1 text-sm">
              <div>ένα (1), δύο (2), τρία (3)</div>
              <div>τέσσερα (4), πέντε (5), έξι (6)</div>
              <div>επτά (7), οκτώ (8), εννέα (9)</div>
              <div>δέκα (10)</div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-bold mb-2">Colors</h4>
            <div className="space-y-1 text-sm">
              <div>άσπρο (white), μαύρο (black)</div>
              <div>κόκκινο (red), μπλε (blue)</div>
              <div>πράσινο (green), κίτρινο (yellow)</div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-bold mb-2">Useful Expressions</h4>
            <div className="space-y-1 text-sm">
              <div><span className="font-mono">φυσικά</span> - of course</div>
              <div><span className="font-mono">επίσης</span> - also</div>
              <div><span className="font-mono">κάτι</span> - something</div>
              <div><span className="font-mono">τα πάντα</span> - everything</div>
              <div><span className="font-mono">τι γίνεται;</span> - what's happening?</div>
              <div><span className="font-mono">τα λέμε</span> - see ya</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SearchContent = () => {
    const [searchResults, setSearchResults] = useState([]);
    
    const allWords = [
      // From verbs - original
      { greek: "κάνω", english: "to do/make", type: "verb", family: "-ω" },
      { greek: "είμαι", english: "to be", type: "verb", family: "irregular" },
      { greek: "έχω", english: "to have", type: "verb", family: "-ω" },
      { greek: "έρχομαι", english: "to come", type: "verb", family: "-ομαι" },
      { greek: "θυμάμαι", english: "to remember", type: "verb", family: "-ομαι" },
      // Irregular verbs
      { greek: "πάω", english: "to go", type: "verb", family: "irregular" },
      { greek: "λέω", english: "to say", type: "verb", family: "irregular" },
      { greek: "τρώω", english: "to eat", type: "verb", family: "irregular" },
      // New verbs from lesson
      { greek: "μένω", english: "to stay/live", type: "verb", family: "-ω" },
      { greek: "οδηγώ", english: "to drive", type: "verb", family: "-ω" },
      { greek: "ζω", english: "to live", type: "verb", family: "-ω" },
      { greek: "αργώ", english: "to be late", type: "verb", family: "-ω" },
      { greek: "τηλεφωνώ", english: "to phone", type: "verb", family: "-ω" },
      { greek: "ξυπνάω", english: "to wake up", type: "verb", family: "-ω" },
      { greek: "κολυμπάω", english: "to swim", type: "verb", family: "-ω" },
      { greek: "φοράω", english: "to wear", type: "verb", family: "-ω" },
      { greek: "πηγαίνω", english: "to go", type: "verb", family: "-ω" },
      { greek: "κοιμάμαι", english: "to sleep", type: "verb", family: "-ομαι" },
      { greek: "λυπάμαι", english: "to feel sorry", type: "verb", family: "-ομαι" },
      { greek: "φοβάμαι", english: "to be afraid", type: "verb", family: "-ομαι" },
      { greek: "γίνομαι", english: "to become", type: "verb", family: "-ομαι" },
      { greek: "σκέφτομαι", english: "to think", type: "verb", family: "-ομαι" },
      { greek: "φωτογραφίζω", english: "to take picture", type: "verb", family: "-ω" },
      { greek: "χαλαρώνω", english: "to relax/chill", type: "verb", family: "-ω" },
      { greek: "ταξιδεύω", english: "to travel", type: "verb", family: "-ω" },
      { greek: "κάθομαι", english: "to sit", type: "verb", family: "-ομαι" },
      { greek: "ακούω", english: "to listen/hear", type: "verb", family: "-ω" },
      { greek: "παίρνω", english: "to take", type: "verb", family: "-ω" },
      { greek: "περνάω", english: "to cross/spend", type: "verb", family: "-ω" },
      { greek: "ξεκινάω", english: "to start/depart", type: "verb", family: "-ω" },
      { greek: "φεύγω", english: "to leave", type: "verb", family: "-ω" },
      { greek: "περιμένω", english: "to wait", type: "verb", family: "-ω" },
      { greek: "δουλεύω", english: "to work", type: "verb", family: "-ω" },
      // From articles
      { greek: "ο", english: "the (masc.)", type: "article" },
      { greek: "η", english: "the (fem.)", type: "article" },
      { greek: "το", english: "the (neut.)", type: "article" },
      { greek: "τον", english: "the (masc. acc.)", type: "article" },
      { greek: "την", english: "the (fem. acc.)", type: "article" },
      { greek: "τους", english: "the (masc. pl. acc.)", type: "article" },
      { greek: "τις", english: "the (fem. pl. acc.)", type: "article" },
      { greek: "τα", english: "the (neut. pl.)", type: "article" },
      // Adverbs of frequency
      { greek: "ποτέ", english: "never", type: "adverb" },
      { greek: "σχεδόν ποτέ", english: "almost never", type: "adverb" },
      { greek: "σπάνια", english: "rarely", type: "adverb" },
      { greek: "καμιά φορά", english: "sometimes", type: "adverb" },
      { greek: "κάπου κάπου", english: "from time to time", type: "adverb" },
      { greek: "πότε πότε", english: "occasionally", type: "adverb" },
      { greek: "μερικές φορές", english: "sometimes", type: "adverb" },
      { greek: "συχνά", english: "often", type: "adverb" },
      { greek: "πολλές φορές", english: "many times", type: "adverb" },
      { greek: "συνήθως", english: "usually", type: "adverb" },
      { greek: "σχεδόν πάντα", english: "almost always", type: "adverb" },
      { greek: "πάντα", english: "always", type: "adverb" },
      // Likes construction
      { greek: "μου αρέσει", english: "I like (one thing)", type: "phrase" },
      { greek: "μου αρέσουν", english: "I like (multiple things)", type: "phrase" },
      { greek: "σου αρέσει", english: "you like (one thing)", type: "phrase" },
      { greek: "του αρέσει", english: "he likes", type: "phrase" },
      { greek: "της αρέσει", english: "she likes", type: "phrase" },
      // Summer/beach vocabulary
      { greek: "το καλοκαίρι", english: "summer", type: "noun" },
      { greek: "η θάλασσα", english: "sea", type: "noun" },
      { greek: "η παραλία", english: "beach", type: "noun" },
      { greek: "ο ήλιος", english: "sun", type: "noun" },
      { greek: "η ζέστη", english: "warmth", type: "noun" },
      { greek: "το ξενοδοχείο", english: "hotel", type: "noun" },
      { greek: "το ταξίδι", english: "trip/journey", type: "noun" },
      { greek: "η ξαπλώστρα", english: "sunbed", type: "noun" },
      { greek: "το μαγιό", english: "swimming costume", type: "noun" },
      { greek: "το καπέλο", english: "hat", type: "noun" },
      { greek: "η βαλίτσα", english: "luggage", type: "noun" },
      { greek: "το παγωτό", english: "ice cream", type: "noun" },
      { greek: "το ροδάκινο", english: "peach", type: "noun" },
      { greek: "το ψάρι", english: "fish", type: "noun" },
      { greek: "το καρπούζι", english: "watermelon", type: "noun" },
      { greek: "το πεπόνι", english: "melon", type: "noun" },
      // Time expressions
      { greek: "κάθε μέρα", english: "every day", type: "phrase" },
      { greek: "η μέρα", english: "day", type: "noun" },
      { greek: "το μεσημέρι", english: "midday", type: "noun" },
      { greek: "το απόγευμα", english: "afternoon", type: "noun" },
      { greek: "το βράδυ", english: "evening", type: "noun" },
      { greek: "η νύχτα", english: "night", type: "noun" },
      { greek: "οι διακοπές", english: "holidays", type: "noun" },
      // Question words
      { greek: "πότε", english: "when (question)", type: "question" },
      { greek: "πού", english: "where", type: "question" },
      { greek: "τι", english: "what", type: "question" },
      { greek: "που", english: "that/which", type: "relative" },
      // From vocabulary - original
      { greek: "καλημέρα", english: "good morning", type: "greeting" },
      { greek: "ευχαριστώ", english: "thank you", type: "phrase" },
      { greek: "παρακαλώ", english: "please/you're welcome", type: "phrase" },
      { greek: "ναι", english: "yes", type: "word" },
      { greek: "όχι", english: "no", type: "word" },
      // New expressions
      { greek: "φυσικά", english: "of course", type: "phrase" },
      { greek: "επίσης", english: "also", type: "adverb" },
      { greek: "κάτι", english: "something", type: "pronoun" },
      { greek: "τα πάντα", english: "everything", type: "phrase" },
      { greek: "ότι", english: "whatever/that", type: "relative" },
      { greek: "όλα", english: "everything", type: "pronoun" },
      { greek: "τι γίνεται", english: "what's happening", type: "phrase" },
      { greek: "τα λέμε", english: "see ya later", type: "phrase" },
      { greek: "αργά", english: "late", type: "adverb" },
      { greek: "πάρα πολύ", english: "very much", type: "phrase" },
      { greek: "ζωηρός", english: "full of life", type: "adjective" },
      { greek: "άτακτος", english: "naughty", type: "adjective" },
      { greek: "μικρός", english: "small", type: "adjective" },
      { greek: "μεγάλος", english: "big", type: "adjective" },
      { greek: "όταν", english: "when (duration)", type: "conjunction" },
      // Time-related vocabulary from lesson
      { greek: "τι ώρα είναι", english: "what time is it", type: "phrase" },
      { greek: "η ώρα", english: "the time/hour", type: "noun" },
      { greek: "ακριβώς", english: "exactly", type: "adverb" },
      { greek: "τέταρτο", english: "quarter", type: "noun" },
      { greek: "μισή", english: "half", type: "adjective" },
      { greek: "παρά", english: "minus/to (time)", type: "preposition" },
      { greek: "και", english: "and/past (time)", type: "conjunction" },
      { greek: "στη μία", english: "at one o'clock", type: "phrase" },
      { greek: "στις τρεις", english: "at three o'clock", type: "phrase" },
      { greek: "στις τέσσερις", english: "at four o'clock", type: "phrase" },
      // Transportation
      { greek: "το τρένο", english: "train", type: "noun" },
      { greek: "το ταξί", english: "taxi", type: "noun" },
      { greek: "ο ταξιτζής", english: "taxi driver", type: "noun" },
      { greek: "το αεροπλάνο", english: "airplane", type: "noun" },
      { greek: "το τρόλεϊ", english: "trolley", type: "noun" },
      { greek: "το ταξιδιωτικό γραφείο", english: "travel agency", type: "noun" },
      // Other new vocabulary
      { greek: "η φίλη", english: "girlfriend/female friend", type: "noun" },
      { greek: "το μάθημα", english: "lesson/class", type: "noun" },
      { greek: "ελληνικά", english: "Greek (language)", type: "noun" },
      { greek: "το διάλειμμα", english: "break/recess", type: "noun" },
      { greek: "πρωί", english: "morning", type: "noun" },
      { greek: "βράδυ", english: "evening", type: "noun" },
      { greek: "νύχτα", english: "night", type: "noun" }
    ];

    const handleSearch = (term) => {
      setSearchTerm(term);
      if (term.length > 0) {
        const results = allWords.filter(word => 
          word.greek.toLowerCase().includes(term.toLowerCase()) ||
          word.english.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
          <h3 className="font-bold text-purple-800">Quick Lookup</h3>
          <p className="text-purple-700 mt-2">
            Search Greek or English words from your materials.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Greek or English..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-bold">Search Results:</h4>
            {searchResults.map((result, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-mono text-lg text-blue-600">{result.greek}</span>
                  <span className="text-gray-700 ml-3">{result.english}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">{result.type}</span>
                  {result.family && (
                    <span className="text-xs bg-blue-200 px-2 py-1 rounded">{result.family}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {searchTerm && searchResults.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No results found for "{searchTerm}"
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold mb-2">💡 Search Tips</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Type in Greek or English to find matches</li>
            <li>• Search will find partial matches (e.g., "καλ" finds "καλημέρα")</li>
            <li>• Look for the verb family tags to know conjugation patterns</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'articles': return <ArticlesContent />;
      case 'present': return <PresentTenseContent />;
      case 'other-tenses': return <OtherTensesContent />;
      case 'vocabulary': return <VocabularyContent />;
      case 'search': return <SearchContent />;
      default: return <ArticlesContent />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Greek Conjugation Reference</h1>
        <p className="text-gray-600">Your comprehensive pattern-based guide to Greek grammar</p>
      </header>

      <nav className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="bg-white rounded-lg shadow-lg p-6">
        {renderContent()}
      </main>

      <footer className="text-center mt-6 text-sm text-gray-500">
        <p>💡 Remember: Patterns over memorization! Once you know the family, you know the conjugation.</p>
      </footer>
    </div>
  );
};

export default GreekReference;