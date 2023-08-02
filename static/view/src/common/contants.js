export const APP_NAME = "WoTaas";
export const APP_NAME_DESCRIPTOR = "Worker - Task Auto Assign";
export const PROJECT_NAME_DESCRIPTOR = "Software Project";

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
	RUNNING: "running",
});

export const THREAD_ACTION = Object.freeze({
	JIRA_EXPORT: "jiraExport",
});

export const THREAD_STATE_DEFAULT = Object.freeze({
	isModalOpen: false,
	threadAction: "",
	threadId: "",
});

export const STORAGE = Object.freeze({
	THREAD_INFO: "threadInfo",
});

export const INTERVAL_FETCH = 10000;

export const COLOR_SKILL_LEVEL = [
    {
        level: 1,
        color: "#CCE0FF",
    },
    {
        level: 2,
        color: "#579DFF",
    },
    {
        level: 3,
        color: "#1D7AFC",
    },
    {
        level: 4,
        color: "#0055CC",
    },
    {
        level: 5,
        color: "#092957",
    },
];

export const RETRY_TIMES = 5;
export const SUBSCRIPTION = Object.freeze({
	FREE_ID : 1,
	PLUS_ID : 2
});