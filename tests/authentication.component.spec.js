describe('Component Tests', () => {
  describe('PasswordComponent', () => {

    let comp = {};
    let service = {
      save: jest.fn()
    };

    beforeEach(() => {
      comp = {
        password: '',
        confirmPassword: '',
        doNotMatch: null,
        error: null,
        success: null,
        changePassword: function () {
          if (this.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
            this.error = null;
            this.success = null;
          } else {
            try {
              service.save(this.password);
              this.doNotMatch = null;
              this.error = null;
              this.success = 'OK';
            } catch (e) {
              this.doNotMatch = null;
              this.success = null;
              this.error = 'ERROR';
            }
          }
        }
      };
      service.save.mockClear();
    });

    test('should show error if passwords do not match', () => {
      comp.password = 'password1';
      comp.confirmPassword = 'password2';

      comp.changePassword();

      expect(comp.doNotMatch).toBe('ERROR');
      expect(comp.error).toBeNull();
      expect(comp.success).toBeNull();
    });

    test('should call Auth.changePassword when passwords match', () => {
      comp.password = comp.confirmPassword = 'myPassword';

      comp.changePassword();

      expect(service.save).toHaveBeenCalledWith('myPassword');
    });

    test('should set success to OK upon success', () => {
      comp.password = comp.confirmPassword = 'myPassword';

      comp.changePassword();

      expect(comp.doNotMatch).toBeNull();
      expect(comp.error).toBeNull();
      expect(comp.success).toBe('OK');
    });

    test('should notify of error if change password fails', () => {
      service.save.mockImplementation(() => { throw new Error('fail') });
      comp.password = comp.confirmPassword = 'myPassword';

      comp.changePassword();

      expect(comp.doNotMatch).toBeNull();
      expect(comp.success).toBeNull();
      expect(comp.error).toBe('ERROR');
    });
  });
});
