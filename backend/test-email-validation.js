/**
 * Test Email Domain Validation
 * Run with: node test-email-validation.js
 */

// Simulate the validation function from auth.js
const ALLOWED_EMAIL_DOMAIN = '@geetauniversity.edu';

function isValidGeetaEmail(email) {
  if (!email) return false;
  const normalizedEmail = email.toLowerCase().trim();
  
  // Check if email ends with allowed domain
  if (!normalizedEmail.endsWith(ALLOWED_EMAIL_DOMAIN)) {
    return false;
  }
  
  // Ensure there's at least one character before @
  const atIndex = normalizedEmail.indexOf('@');
  // @ should exist, be at position > 0, and the domain should start right after @
  return atIndex > 0 && normalizedEmail.substring(atIndex) === ALLOWED_EMAIL_DOMAIN;
}

console.log('🧪 Testing Email Domain Validation\n');
console.log('='.repeat(60));

// Test cases
const testCases = [
  // Valid emails
  { email: 'student@geetauniversity.edu', expected: true, description: 'Valid email (lowercase)' },
  { email: 'STUDENT@GEETAUNIVERSITY.EDU', expected: true, description: 'Valid email (uppercase)' },
  { email: 'john.doe@geetauniversity.edu', expected: true, description: 'Valid email (with dot)' },
  { email: 'test123@geetauniversity.edu', expected: true, description: 'Valid email (with numbers)' },
  { email: '  student@geetauniversity.edu  ', expected: true, description: 'Valid email (with spaces)' },
  
  // Invalid emails
  { email: 'student@gmail.com', expected: false, description: 'Invalid email (gmail)' },
  { email: 'student@yahoo.com', expected: false, description: 'Invalid email (yahoo)' },
  { email: 'student@geetauniversity.com', expected: false, description: 'Invalid email (wrong domain)' },
  { email: 'student@geetauniversity.edu.in', expected: false, description: 'Invalid email (extra extension)' },
  { email: '@geetauniversity.edu', expected: false, description: 'Invalid email (no username)' },
  { email: '', expected: false, description: 'Invalid email (empty)' },
  { email: null, expected: false, description: 'Invalid email (null)' },
  { email: undefined, expected: false, description: 'Invalid email (undefined)' },
];

let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
  const result = isValidGeetaEmail(testCase.email);
  const status = result === testCase.expected ? '✅ PASS' : '❌ FAIL';
  
  if (result === testCase.expected) {
    passed++;
  } else {
    failed++;
  }
  
  console.log(`Test ${index + 1}: ${status}`);
  console.log(`  Email: ${testCase.email || '(empty/null)'}`);
  console.log(`  Expected: ${testCase.expected}, Got: ${result}`);
  console.log(`  Description: ${testCase.description}\n`);
});

console.log('='.repeat(60));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('✅ All tests passed! Email validation is working correctly.\n');
  process.exit(0);
} else {
  console.log('❌ Some tests failed. Please check the validation logic.\n');
  process.exit(1);
}

