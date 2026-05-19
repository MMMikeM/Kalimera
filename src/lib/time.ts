import { Temporal } from "@js-temporal/polyfill";

// --- Current time --------------------------------------------------------

export const nowInstant = (): Temporal.Instant => Temporal.Now.instant();
export const today = (): Temporal.PlainDate => Temporal.Now.plainDateISO("UTC");
export const nowIso = (): string => Temporal.Now.instant().toString({ fractionalSecondDigits: 0 });

// --- Parsing -------------------------------------------------------------

/** "YYYY-MM-DD" → PlainDate */
export const parsePlainDate = (iso: string): Temporal.PlainDate => Temporal.PlainDate.from(iso);

// --- Instant ↔ PlainDate (UTC) -------------------------------------------

/** Instant → PlainDate at UTC date */
export const toPlainDate = (i: Temporal.Instant): Temporal.PlainDate =>
	i.toZonedDateTimeISO("UTC").toPlainDate();

/** PlainDate → Instant at UTC midnight */
export const toInstant = (d: Temporal.PlainDate): Temporal.Instant =>
	d.toZonedDateTime("UTC").toInstant();

// --- Epoch-seconds ↔ Instant (DB boundary) ------------------------------

export const fromEpochSeconds = (n: number): Temporal.Instant =>
	Temporal.Instant.fromEpochMilliseconds(n * 1000);

export const toEpochSeconds = (i: Temporal.Instant): number =>
	Math.floor(i.epochMilliseconds / 1000);

/** Temporal.Instant → ISO 8601 string for DB storage (second precision, UTC) */
export const toISOString = (i: Temporal.Instant): string =>
	i.toString({ fractionalSecondDigits: 0 });

/** ISO 8601 string from DB → Temporal.Instant */
export const fromISOString = (s: string): Temporal.Instant => Temporal.Instant.from(s);

// --- Diff helpers --------------------------------------------------------

/** Positive = a is after b (in whole days) */
export const diffInDays = (a: Temporal.PlainDate, b: Temporal.PlainDate): number =>
	a.since(b, { largestUnit: "days" }).days;

/** Positive = a is after b (in whole hours, truncated) */
export const diffInHours = (a: Temporal.Instant, b: Temporal.Instant): number =>
	Math.trunc(Number(a.since(b, { largestUnit: "hours" }).hours));

// --- Day boundaries (UTC) ------------------------------------------------

export const startOfDayUTC = (d: Temporal.PlainDate): Temporal.Instant => toInstant(d);

export const endOfDayUTC = (d: Temporal.PlainDate): Temporal.Instant =>
	d.add({ days: 1 }).toZonedDateTime("UTC").subtract({ nanoseconds: 1 }).toInstant();

/** End of tomorrow UTC */
export const endOfTomorrowUTC = (): Temporal.Instant => endOfDayUTC(today().add({ days: 1 }));

// --- Month enumeration ---------------------------------------------------

export const eachDayOfMonth = (d: Temporal.PlainDate): Temporal.PlainDate[] => {
	const first = d.with({ day: 1 });
	const last = d.with({ day: d.daysInMonth });
	const days: Temporal.PlainDate[] = [];
	let cur = first;
	while (Temporal.PlainDate.compare(cur, last) <= 0) {
		days.push(cur);
		cur = cur.add({ days: 1 });
	}
	return days;
};

// --- Formatting ----------------------------------------------------------

const MONTH_SHORT = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const MONTH_LONG = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

/** YYYY-MM-DD */
export const formatISO = (d: Temporal.PlainDate): string => d.toString();

/** "5 Jan" */
export const formatDayMonth = (d: Temporal.PlainDate): string =>
	`${d.day} ${MONTH_SHORT[d.month - 1]}`;

/** "January 2026" */
export const formatMonthYear = (d: Temporal.PlainDate): string =>
	`${MONTH_LONG[d.month - 1]} ${d.year}`;

// --- Calendar helpers ----------------------------------------------------

/**
 * Day of week: Monday=0 … Sunday=6.
 * Temporal.dayOfWeek is ISO (Mon=1 … Sun=7), so subtract 1.
 */
export const mondayBasedDayOfWeek = (d: Temporal.PlainDate): number => d.dayOfWeek - 1;
