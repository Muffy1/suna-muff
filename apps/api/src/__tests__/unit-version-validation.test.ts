import { describe, expect, test } from 'bun:test';
import { assertValidSandboxVersion, isValidSandboxVersion } from '../update/version-validation';

describe('sandbox version validation', () => {
  test('accepts Docker tag-shaped sandbox versions', () => {
    expect(isValidSandboxVersion('latest')).toBe(true);
    expect(isValidSandboxVersion('0.8.29')).toBe(true);
    expect(isValidSandboxVersion('dev-a1b2c3d4')).toBe(true);
    expect(isValidSandboxVersion('release_candidate-1.2.3')).toBe(true);
  });

  test('rejects versions that can change shell parsing or image repository paths', () => {
    const invalidVersions = [
      '',
      'latest$(id)',
      'latest`id`',
      'latest;id',
      'latest && id',
      'latest\nid',
      'latest#fragment',
      'kortix/computer:latest',
      '.starts-with-dot',
      '-starts-with-dash',
      'a'.repeat(129),
    ];

    for (const version of invalidVersions) {
      expect(isValidSandboxVersion(version)).toBe(false);
      expect(() => assertValidSandboxVersion(version)).toThrow('Invalid sandbox version');
    }
  });
});
