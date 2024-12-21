// Babel Assumptions
module.exports = {
  // assumptions, // Use the defined assumptions
  assumptions : {
    setPublicClassFields: true,
    privateFieldsAsSymbols: true,
  },
  presets: ['module:@react-native/babel-preset'], // React Native preset
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        version: '2023-05', // Version for decorators proposal
      },
    ],
    '@babel/plugin-transform-class-static-block', // Enable static blocks in classes
  ],
};
