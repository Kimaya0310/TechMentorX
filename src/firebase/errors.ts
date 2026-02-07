export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  public readonly context: SecurityRuleContext;
  public readonly serverError?: Error;

  constructor(context: SecurityRuleContext, serverError?: Error) {
    const message = `Firestore Permission Denied: Cannot ${context.operation} at path "${context.path}".`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;
    this.serverError = serverError;
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }

  public toMetric() {
    return {
      name: this.name,
      message: this.message,
      context: this.context,
      stack: this.stack,
    };
  }
}
