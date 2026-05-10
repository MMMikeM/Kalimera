import { createContext, useContext, useMemo } from "react";
import { useStore } from "zustand";

import { completeSessionFn, recordAttemptFn, startSessionFn } from "../srs-loader";
import {
	createDrillStore,
	type DrillSessionCallbacks,
	type DrillState,
	type DrillStore,
	type DrillStoreConfig,
} from "./drill-store";

export const DrillStoreContext = createContext<DrillStore | null>(null);

export const useDrillContext = (): DrillStore => {
	const store = useContext(DrillStoreContext);
	if (!store) throw new Error("useDrillStore must be used inside <DrillProvider>");
	return store;
};

// <T,> trailing comma disambiguates from JSX in .tsx files
export const useDrillStore = <T,>(selector: (s: DrillState) => T): T => {
	return useStore(useDrillContext(), selector);
};

const SESSION_CALLBACKS: DrillSessionCallbacks = {
	startSession: async ({ sessionType, category, wordTypeFilter }) => {
		const json = await startSessionFn({
			data: {
				sessionType: sessionType as Parameters<typeof startSessionFn>[0]["data"]["sessionType"],
				category,
				wordTypeFilter,
			},
		});
		return json?.success && json?.session?.id ? json.session.id : null;
	},
	recordAttempt: (params) => {
		recordAttemptFn({
			data: {
				sessionId: params.sessionId,
				drillId: params.drillId,
				questionText: params.prompt,
				correctAnswer: params.correctAnswer,
				userAnswer: params.userAnswer,
				isCorrect: params.isCorrect,
				timeTaken: params.timeTaken,
				skillType: params.skillType,
				vocabularyId: params.vocabularyId,
				weakAreaType: params.weakAreaType,
				weakAreaIdentifier: params.weakAreaIdentifier,
			},
		}).catch(() => {});
	},
	completeSession: (params) => {
		completeSessionFn({ data: params }).catch(() => {});
	},
};

export function DrillProvider({
	config,
	children,
}: {
	config: Omit<DrillStoreConfig, "sessionCallbacks">;
	children: React.ReactNode;
}) {
	// eslint-disable-next-line react-hooks/exhaustive-deps -- store created once per mount; config is mount-time stable
	const store = useMemo(
		() => createDrillStore({ ...config, sessionCallbacks: SESSION_CALLBACKS }),
		[],
	);

	return <DrillStoreContext.Provider value={store}>{children}</DrillStoreContext.Provider>;
}
