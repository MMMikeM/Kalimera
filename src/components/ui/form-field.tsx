import { useId } from "react";

import { Input } from "./input";
import { Label } from "./label";

interface FormFieldProps {
	name: string;
	label: string;
	type?: "text" | "password" | "email";
	placeholder?: string;
	autoComplete?: string;
	autoCapitalize?: "none" | "off" | "on" | "sentences" | "words" | "characters";
	autoCorrect?: "off" | "on";
	disabled?: boolean;
	error?: string;
	defaultValue?: string;
}

export function FormField({
	name,
	label,
	type = "text",
	placeholder,
	autoComplete,
	autoCapitalize,
	autoCorrect,
	disabled,
	error,
	defaultValue,
}: FormFieldProps) {
	const inputId = useId();
	const errorId = useId();

	return (
		<div className="space-y-2">
			<Label htmlFor={inputId}>{label}</Label>
			<Input
				id={inputId}
				name={name}
				type={type}
				placeholder={placeholder}
				autoComplete={autoComplete}
				autoCapitalize={autoCapitalize}
				autoCorrect={autoCorrect}
				disabled={disabled}
				defaultValue={defaultValue}
				aria-describedby={error ? errorId : undefined}
				aria-invalid={!!error}
			/>
			{error && (
				<p id={errorId} className="text-sm text-red-600">
					{error}
				</p>
			)}
		</div>
	);
}
