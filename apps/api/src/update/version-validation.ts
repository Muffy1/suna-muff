const DOCKER_TAG_PATTERN = /^[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}$/;

export function isValidSandboxVersion(version: string): boolean {
  return DOCKER_TAG_PATTERN.test(version);
}

export function assertValidSandboxVersion(version: string): void {
  if (!isValidSandboxVersion(version)) {
    throw new Error('Invalid sandbox version. Expected a Docker image tag.');
  }
}
