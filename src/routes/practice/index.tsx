import { redirect } from "react-router";

// Default to Speed Drill - the primary training experience
export const loader = () => redirect("/practice/speed");
