export const sample = [
	{
		id: 1,
		name: "Task 1",
		duration: 5,
		milestoneId: 1,
		precedences: [],
		skillRequireds: [
			{
				skillId: 3,
				level: 5,
			},
		],
	},
	{
		id: 2,
		name: "Task 2",
		duration: 12,
		milestoneId: 1,
		precedences: [
			{
				taskId: 2,
				precedenceId: 1,
			},
		],
		skillRequireds: [],
	},
	{
		id: 3,
		name: "Task 3",
		duration: 12,
		milestoneId: 1,
		precedences: [
			{
				taskId: 3,
				precedenceId: 2,
			},
		],
		skillRequireds: [
			{
				skillId: 3,
				level: 1,
			},
		],
	},
	{
		id: 4,
		name: "Task 4",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 4,
				precedenceId: 3,
			},
		],
		skillRequireds: [
			{
				skillId: 20,
				level: 3,
			},
		],
	},
	{
		id: 5,
		name: "Task 5",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 5,
				precedenceId: 4,
			},
		],
		skillRequireds: [
			{
				skillId: 7,
				level: 2,
			},
		],
	},
	{
		id: 6,
		name: "Task 6",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 6,
				precedenceId: 5,
			},
		],
		skillRequireds: [
			{
				skillId: 12,
				level: 5,
			},
		],
	},
	{
		id: 7,
		name: "Task 7",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 7,
				precedenceId: 6,
			},
		],
		skillRequireds: [
			{
				skillId: 6,
				level: 5,
			},
		],
	},
	{
		id: 8,
		name: "Task 8",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 8,
				precedenceId: 7,
			},
		],
		skillRequireds: [
			{
				skillId: 25,
				level: 1,
			},
		],
	},
	{
		id: 9,
		name: "Task 9",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 9,
				precedenceId: 8,
			},
		],
		skillRequireds: [
			{
				skillId: 5,
				level: 5,
			},
		],
	},
	{
		id: 10,
		name: "Task 10",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 10,
				precedenceId: 9,
			},
		],
		skillRequireds: [
			{
				skillId: 5,
				level: 3,
			},
		],
	},
	{
		id: 11,
		name: "Task 11",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 11,
				precedenceId: 10,
			},
		],
		skillRequireds: [
			{
				skillId: 14,
				level: 1,
			},
		],
	},
	{
		id: 12,
		name: "Task 12",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 12,
				precedenceId: 11,
			},
		],
		skillRequireds: [
			{
				skillId: 23,
				level: 5,
			},
		],
	},
	{
		id: 13,
		name: "Task 13",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 13,
				precedenceId: 12,
			},
		],
		skillRequireds: [
			{
				skillId: 4,
				level: 5,
			},
		],
	},
	{
		id: 14,
		name: "Task 14",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 14,
				precedenceId: 13,
			},
		],
		skillRequireds: [
			{
				skillId: 11,
				level: 5,
			},
		],
	},
	{
		id: 15,
		name: "Task 15",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 15,
				precedenceId: 14,
			},
		],
		skillRequireds: [
			{
				skillId: 14,
				level: 5,
			},
		],
	},
	{
		id: 16,
		name: "Task 16",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 16,
				precedenceId: 15,
			},
		],
		skillRequireds: [
			{
				skillId: 3,
				level: 1,
			},
		],
	},
	{
		id: 17,
		name: "Task 17",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 17,
				precedenceId: 16,
			},
		],
		skillRequireds: [
			{
				skillId: 3,
				level: 2,
			},
		],
	},
	{
		id: 18,
		name: "Task 18",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 18,
				precedenceId: 17,
			},
		],
		skillRequireds: [
			{
				skillId: 18,
				level: 3,
			},
		],
	},
	{
		id: 19,
		name: "Task 19",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 19,
				precedenceId: 18,
			},
		],
		skillRequireds: [
			{
				skillId: 7,
				level: 5,
			},
		],
	},
	{
		id: 20,
		name: "Task 20",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 20,
				precedenceId: 19,
			},
		],
		skillRequireds: [
			{
				skillId: 2,
				level: 2,
			},
		],
	},
	{
		id: 21,
		name: "Task 21",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 21,
				precedenceId: 20,
			},
		],
		skillRequireds: [
			{
				skillId: 15,
				level: 5,
			},
		],
	},
	{
		id: 22,
		name: "Task 22",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 22,
				precedenceId: 21,
			},
		],
		skillRequireds: [
			{
				skillId: 7,
				level: 3,
			},
		],
	},
	{
		id: 23,
		name: "Task 23",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 23,
				precedenceId: 22,
			},
		],
		skillRequireds: [
			{
				skillId: 19,
				level: 5,
			},
		],
	},
	{
		id: 24,
		name: "Task 24",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 24,
				precedenceId: 22,
			},
		],
		skillRequireds: [
			{
				skillId: 25,
				level: 3,
			},
		],
	},
	{
		id: 25,
		name: "Task 25",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 25,
				precedenceId: 24,
			},
		],
		skillRequireds: [
			{
				skillId: 7,
				level: 5,
			},
		],
	},
	{
		id: 26,
		name: "Task 26",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 26,
				precedenceId: 25,
			},
		],
		skillRequireds: [
			{
				skillId: 12,
				level: 5,
			},
		],
	},
	{
		id: 27,
		name: "Task 27",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 27,
				precedenceId: 26,
			},
		],
		skillRequireds: [
			{
				skillId: 3,
				level: 3,
			},
		],
	},
	{
		id: 28,
		name: "Task 28",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 28,
				precedenceId: 27,
			},
		],
		skillRequireds: [
			{
				skillId: 12,
				level: 1,
			},
		],
	},
	{
		id: 29,
		name: "Task 29",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 29,
				precedenceId: 28,
			},
		],
		skillRequireds: [
			{
				skillId: 6,
				level: 4,
			},
		],
	},
	{
		id: 30,
		name: "Task 30",
		duration: 5,
		milestoneId: 1,
		precedences: [
			{
				taskId: 30,
				precedenceId: 29,
			},
		],
		skillRequireds: [
			{
				skillId: 16,
				level: 1,
			},
		],
	},
	{
		id: 64,
		name: "new task 1",
		duration: 12,
		milestoneId: 1,
		precedences: [
			{
				taskId: 64,
				precedenceId: 1,
			},
		],
		skillRequireds: [
			{
				skillId: 2,
				level: 1,
			},
			{
				skillId: 3,
				level: 1,
			},
			{
				skillId: 37,
				level: 1,
			},
		],
	},
];

export const sampleSkills = [
	{
		id: 1,
		name: "Skill 0",
	},
	{
		id: 2,
		name: "Skill 1",
	},
	{
		id: 3,
		name: "Skill 2",
	},
	{
		id: 4,
		name: "Skill 3",
	},
	{
		id: 5,
		name: "Skill 4",
	},
];

export var globalSelectedTasks = [];

export const updateGlobalSelectedTasks = (tasks) =>
	(globalSelectedTasks = tasks);
