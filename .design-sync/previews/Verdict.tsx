import { Verdict } from "kalimera";

export const Correct = () => <Verdict isCorrect />;

export const Incorrect = () => <Verdict isCorrect={false} />;

export const TimedOut = () => <Verdict isCorrect={false} timedOut />;
