export enum Position {
	TopLeft,
	Top,
	TopCenter,
	TopRight,
	Left,
	Right,
	Center,
	BottomLeft,
	Bottom,
	BottomCenter,
	BottomRight
}

export type Notification = {
	id?: number;
	title: string;
	body?: string;
	timeout?: number;
	type?: string;
};
