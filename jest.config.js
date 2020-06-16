module.exports = {
  roots: ['<rootDir>/e2e'],
  testMatch: ['**/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
