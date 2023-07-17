export const APP_NAME = "Resource Assign";
export const APP_NAME_DESCRIPTOR = "Resource Assign Demo";

export const MEDIA_QUERY = {
	DESKTOP_LAPTOP: {
		MIN: 992,
	},
	BIG_SCREEN: {
		MIN: 1824,
	},
	TABLET: {
		MIN: 767,
		MAX: 991,
	},
	MOBILE: {
		MAX: 767,
	},
};

export const MODAL_WIDTH = {
	XL: "x-large",
	L: "large",
	M: "medium",
};

export const DATE_FORMAT = {
	DMY: "DD/MM/YYYY",
};

export const ROW_PER_PAGE = 10;
export const ROW_PER_PAGE_MODAL_TABLE = 7;

export const THREAD_STATUS = Object.freeze({
	SUCCESS: "success",
	ERROR: "error",
});

export const THREAD_ACTION = Object.freeze({
	JIRA_EXPORT: "jiraExport",
});

export const THREAD_STATE_DEFAULT = Object.freeze({
	isModalOpen: false,
	threadAction: "",
	threadId: "",
});

export const INTERVAL_FETCH = 10000;
