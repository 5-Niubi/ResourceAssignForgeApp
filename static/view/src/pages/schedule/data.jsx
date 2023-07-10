export const sample = [
	{
		id: 1,
		name: "Start",
		duration: 0,
		critical: true,
		precedence: [],
	},
	{
		id: 2,
		name: "Task 1",
		duration: 4,
		critical: true,
		precedence: [1],
	},
	{
		id: 3,
		name: "Task 2",
		duration: 5.33,
		critical: false,
		precedence: [],
	},
	{
		id: 4,
		name: "Task 3 siêuuuuuuuuuuuuuuuuu dàiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
		duration: 5.17,
		critical: true,
		precedence: [1, 2],
	},
	{
		id: 5,
		name: "Task 4",
		duration: 6.33,
		critical: false,
		precedence: [],
	},
	{
		id: 6,
		name: "Task 5",
		duration: 5.17,
		critical: true,
		precedence: [],
	},
	{
		id: 7,
		name: "Task 6",
		duration: 4.5,
		critical: false,
		precedence: [],
	},
	{
		id: 8,
		name: "Task 7",
		duration: 5.17,
		critical: true,
		precedence: [],
	},
	{
		id: 9,
		name: "Finish",
		duration: 0,
		critical: true,
		precedence: [],
	},
	{
		id: 10,
		name: "Task 8",
		duration: 0,
		critical: true,
		precedence: [],
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
