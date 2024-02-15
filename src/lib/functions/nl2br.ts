// formatDescription.js
export function nl2br(description: string) {
	return description.replace(/\n/g, '<br>');
}
