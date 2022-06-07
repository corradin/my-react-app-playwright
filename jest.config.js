module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
