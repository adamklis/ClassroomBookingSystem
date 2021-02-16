import { PermissionsDirective } from './permissions.directive';

describe('PermissionsDirective', () => {
  it('should create an instance', () => {
    const authorizationServiceMock = null;
    const rendererMock = null;
    const elementRefMock = null;
    const directive = new PermissionsDirective(authorizationServiceMock, rendererMock, elementRefMock);
    expect(directive).toBeTruthy();
  });
});
