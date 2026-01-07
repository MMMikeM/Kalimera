import type { FormScope } from "@rvf/react-router";
import { useField } from "@rvf/react-router";
import { useId } from "react";
import { Input } from "./input";
import { Label } from "./label";

interface FormFieldProps {
	/** RVF form scope for the field */
	scope: FormScope<string>;
	/** Label text */
	label: string;
	/** Input type */
	type?: "text" | "password" | "email";
	/** Placeholder text */
	placeholder?: string;
	/** HTML autocomplete attribute */
	autoComplete?: string;
	/** Disable autocapitalize (useful for usernames) */
	autoCapitalize?: "none" | "off" | "on" | "sentences" | "words" | "characters";
	/** Disable autocorrect */
	autoCorrect?: "off" | "on";
	/** Whether the field is disabled */
	disabled?: boolean;
}

export function FormField({
	scope,
	label,
	type = "text",
	placeholder,
	autoComplete,
	autoCapitalize,
	autoCorrect,
	disabled,
}: FormFieldProps) {
	const field = useField(scope);
	const inputId = useId();
	const errorId = useId();
	const error = field.error();

	return (
		<div className="space-y-2">
			<Label htmlFor={inputId}>{label}</Label>
			<Input
				{...field.getInputProps({
					id: inputId,
					type,
					placeholder,
					autoComplete,
					autoCapitalize,
					autoCorrect,
					disabled,
					"aria-describedby": error ? errorId : undefined,
					"aria-invalid": !!error,
				})}
			/>
			{error && (
				<p id={errorId} className="text-sm text-red-600">
					{error}
				</p>
			)}
		</div>
	);
}
