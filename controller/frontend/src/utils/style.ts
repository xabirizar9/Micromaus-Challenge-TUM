export const getGlobalStyle = (name: string) =>
	getComputedStyle(document.body).getPropertyValue(name);
