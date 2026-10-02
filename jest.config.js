module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['<rootDir>/tests/**/*.(test|spec).(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
