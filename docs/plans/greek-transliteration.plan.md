# Plan: formal transliteration for typed answers

**Status: tabled.** The pronunciation work is finished and shipped. This document
captures a follow-on decision that was explored and deliberately deferred, so it can be
picked up without redoing the analysis.

---

## What already exists (do not redo)

Shipped and working:

- `src/lib/greek-phonetic.ts` — **pronunciation**. Greek → how the word sounds, as
  tokens carrying stress (`greekToPronunciationTokens`). Rendered by
  `<Pronunciation>` with the stressed run underlined. `πώς` → `/p͟os/`.
- `src/lib/greek-transliteration.ts` — **matching**. `greekToPhonetic` produces a
  keyboard key, `matchPhonetic` grades answers, `toPhoneticCanonical` normalises.
- `src/lib/__fixtures__/pronunciation-corpus.json` — 4090 harvested strings snapshotted
  against current behaviour, plus `greek-typeable.test.ts` asserting every displayed
  gloss is accepted (1891/1891, known-failing list empty).

The pronunciation side is settled. Nothing below changes it.

## The problem this would solve

Three transformers exist, and one of them is glue:

| Function | Direction | Job |
| --- | --- | --- |
| `greekToPhonetic` | Greek → Latin | the matching key |
| `greekToPronunciationTokens` | Greek → Latin | the displayed hint |
| `toPhoneticCanonical` | **Latin → Latin** | absorbs the difference between them |

Nearly every rule in `toPhoneticCanonical` (`gh→g`, `h→i`, `w→o`, `ei→i`, `oi→i`,
`ks→x`, `av→af`) translates convention one into convention two. It is not modelling how
humans type; it is patching a disagreement.

Worse, `greekToPhonetic` exists to be letter-faithful and reversible, and
`toPhoneticCanonical` then collapses `h→i`, `ei→i`, `oi→i`, `u→i` — destroying exactly
the distinctions reversibility was preserving. Both bugs fixed in `00d8563` were
ordering artefacts of this pile: a vestigial `ph` guard, and a non-confluent
`οι`/`ει` collapse.

Measured evidence that `greekToPhonetic` is redundant:

- The two encodings are interchangeable for **2666/2666** corpus words.
- **0** false accepts when one word's gloss is tested against another word.

Not yet proven: that accept/reject is identical across *wrong* inputs. That check is
what would justify deleting it, and the corpus fixture is the harness for it.

## Decisions taken (do not relitigate)

1. **Target: ELOT 743 / ISO 843 Type 2 transcription, minus accents.** Canonical, but
   see the correction below — Type 2 is *not* plain ASCII, so the accent-stripping is a
   deliberate deviation, not part of the standard.
2. **Strict matching.** Accept exactly two things: the Greek word typed in Greek, or the
   exact transcription. **No `accepts` variant sets.** Tightening happens over time by
   refining the spec, not by loosening tolerance.
3. **Two strings, two jobs.** The transcription is what the learner types and what
   matching accepts. The pronunciation hint stays on screen for how to *say* it. Neither
   exists to patch the other, and `toPhoneticCanonical` is deleted.
4. **`greekToPhonetic` is deleted**, once equivalence is demonstrated against the corpus.

## The finding that matters most

**ISO 843 contains two systems, and Type 1 is the wrong one.** This cost real time to
discover; do not start from the Type 1 table.

**Type 1 (Transliteration)** is reversible and therefore needs diacritics:

```text
Θέλω → Thélō      Καλημέρα → Kalīméra      πώς → pṓs      ζωή → zōī́
```

`ī`, `ō`, `é`, `ḯ` — untypeable on an English keyboard. Not a candidate.

**Type 2 (Transcription)** drops the macrons but **keeps the tonos**:

```text
Θέλω → thélo      Καλημέρα → kaliméra      σωστά → sostá      πρόσφυγες → prósfyges
```

So Type 2 is *not* plain ASCII either. Verified against Pedersen's comparison chart
(transliteration.eki.ee/pdf/Greek.pdf, column "ISO 843 1997 TR(2.0)"), cross-checked
with the ISO 843:1997 preview. An earlier draft of this plan claimed otherwise.

**Neither ISO type is typeable as written.** The observed corpus drops accents
completely (`sosta`, `prosfiges`, `omos`), so any usable target is "Type 2 minus
accents" — already a deviation. The question is therefore not canonical-versus-usable,
but how many deviations, all of the same kind.

ELOT, the UN and ISO are essentially equivalent on transcription; the bodies diverge
only on reversible transliteration. So Type 2 is the *more* canonical choice, not a
compromise.

Note this is close to the hand-written `greeklish` that used to live in the drill files
(`pente`, `trianta`, `kalimera`, `legetai`). The original content was already roughly
ELOT transcription.


## The verified Type 2 table

Source: Thomas Pedersen's comparison chart, `transliteration.eki.ee/pdf/Greek.pdf`,
column **"ISO 843 1997 TR(2.0)"**, cross-checked against the free ISO 843:1997 preview
at `cdn.standards.iteh.ai/samples/5215/`. Do not re-derive this.

| Greek | Type 2 | | Greek | Type 2 |
| --- | --- | --- | --- | --- |
| α | a | | ν | n |
| β | v | | ξ | x |
| γ | g | | ο | o |
| δ | d | | π | p |
| ε | e | | ρ | r |
| ζ | z | | σ, ς | s |
| η | **i** | | τ | t |
| θ | th | | υ | **y** |
| ι | i | | φ | f |
| κ | k | | χ | **ch** |
| λ | l | | ψ | ps |
| μ | m | | ω | **o** |

Digraphs and clusters:

| | Type 2 | condition |
| --- | --- | --- |
| αι / ει / οι / υι | ai / ei / oi / yi | |
| ου | ou | `oy` when accented |
| αυ / ευ / ηυ | av / ev / iv | before β γ δ ζ λ μ ν ρ and all vowels |
| | af / ef / if | before θ κ ξ π σ τ φ χ ψ, and word-finally |
| | ay / ey / iy | when the digraph is broken (accent on the first vowel, or dialytika on υ) |
| γγ | ng | |
| γκ | gk | all positions |
| γξ / γχ | nx / nch | |
| μπ | b | word-initial **and word-final** |
| | mp | medial |
| ντ | nt | all positions |

Accents: the tonos maps to an acute on the Latin vowel (`ά → á`). **We drop it** — a
deliberate deviation, see above.

Two warts to know about, per the other agent's reading of the ISO text (unverified by
me): Type 2 gives `μπ → b` but leaves `γκ → gk` and `ντ → nt`, which nobody pronounces
that way (αγκαλιά, ντομάτα) — so it is inconsistent about the phonetic accommodation it
does make. And Note 11 permits `Thalassa` over `THalassa` sentence-initially, which is a
small crack in determinism for a converter.

## Deviations to decide

Every row here is the same kind of choice, since dropping accents already puts us off
the standard:

| | Type 2 | observed corpus | note |
| --- | --- | --- | --- |
| accents | `sostá` | `sosta` | forced — untypeable otherwise |
| υ | `y` | `i` | `prósfyges` vs `prosfiges` |
| χ | `ch` | `x` | `eícha` vs `eixa` |
| ξ | `x` | `x` and `ks` | constrained by χ — if χ takes `x`, ξ cannot |

ELOT's χ→`ch` / ξ→`x` pairing is collision-free, which is exactly what the injectivity
property in `greek-transcription.test.ts` checks. The corpus's χ→`x` is what would break
it. The standard is safe here and the deviation is the risky one.

## Cost of strictness

Measured against the hand-written spellings removed in `e786537`, as a proxy for what a
learner types unaided:

- 82 spellings sampled
- 82 accepted today under fuzzy matching
- **46 would still be accepted under strict matching; 36 would newly fail**

Examples that would start failing: `gia sou`, `antio`, `pente`, `trianta`, `signomi`.
Under ELOT Type 2 most of these come back (`pente`, `trianta` are ELOT-correct), so the
real failure rate should be well below 44% — but it must be re-measured against the
actual Type 2 table, not assumed.

## Steps

1. ~~Pin down the authoritative Type 2 table.~~ **Done — see below.**
2. Implement it as an ordered unit table reusing the tokenizer shape already proven in
   `greek-phonetic.ts` — `GreekChar` records with diacritics hoisted to flags, first
   match wins, no sentinel insertion.
3. Rewrite `matchPhonetic` as strict equality against either the transcription or the
   diacritic-and-case-stripped Greek.
4. Delete `toPhoneticCanonical` and `greekToPhonetic`, having first diffed old-vs-new
   accept/reject across the corpus **including wrong inputs**.
5. Decide what the drill reveal shows. With two strings, the on-screen hint is no
   longer what the learner types — the reveal must show the transcription too, or the
   learner is being asked to produce a string that is never displayed. **This is the
   main open UX question and it is unresolved.**
6. Update `CLAUDE.md` and `docs/design-guidelines.md`, both of which currently document
   the two-convention split as matching-vs-display.

## Open questions

- Step 5 above: what the learner sees versus what they type.
- Whether `υ → y` (ELOT) or `υ → i` is better for a beginner; ELOT says `y`
  (`Κυριακή → kyriaki`).
- Whether typing Greek directly is genuinely wanted, or only a theoretical affordance.

## Verification

`pnpm exec vitest run src/lib/` plus the corpus fixture. Any change to displayed output
must regenerate `pronunciation-corpus.json` deliberately, after confirming the drift is
exactly what was intended — the procedure used in `00d8563`.
