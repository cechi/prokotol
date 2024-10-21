/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	transform: {
		'^.+\\.(js|ts)$': ['ts-jest', {
			useESM: true,
			isolatedModules: true,
			tsconfig: {
				allowJs: true,
			}
		}],
	},
	modulePathIgnorePatterns: ["<rootDir>/dist/"],
	// transformIgnorePatterns: ['<rootDir>/.yarn/cache'],
	transformIgnorePatterns: [`/node_modules/(?!${['lit-element', 'lit-html', 'lit', '@lit'].join('|')})`],
	testEnvironment: 'node',
	extensionsToTreatAsEsm: ['.ts'],
	//setupFilesAfterEnv: ['../../setupTests.ts']
}

// https://github.com/kulshekhar/ts-jest/issues/2629#issuecomment-1123909905
