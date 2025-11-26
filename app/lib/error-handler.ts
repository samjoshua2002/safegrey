// lib/error-handler.ts
export class SecurityScanError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'SecurityScanError'
  }
}