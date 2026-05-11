import { db } from "../server/db";
import { tags, vocabulary, vocabularyTags } from "../server/db/schema";

async function main() {
	const [vocabCount, tagsCount, vtCount] = await Promise.all([
		db.$count(vocabulary),
		db.$count(tags),
		db.$count(vocabularyTags),
	]);

	console.log("vocabulary count:", vocabCount);
	console.log("tags count:", tagsCount);
	console.log("vocabulary_tags count:", vtCount);

	process.exit(0);
}

main().catch(console.error);
