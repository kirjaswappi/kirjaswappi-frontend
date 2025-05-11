import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import GetOTPByEmail from './GetOTPByEmail';

describe('GetOTPByEmail Component', () => {
  const mockRegister = vi.fn().mockImplementation((name) => ({
    name,
    onChange: vi.fn(),
    onBlur: vi.fn(),
  }));
  
  it('renders without crashing', () => {
    expect(() => 
      render(
        <GetOTPByEmail
          register={mockRegister}
          errors={{}}
        />
      )
    ).not.toThrow();
  });
  
  it('renders email input with placeholder', () => {
    const { container } = render(
      <GetOTPByEmail
        register={mockRegister}
        errors={{}}
      />
    );
    
    // Check for the input element directly
    const inputElement = container.querySelector('input[type="email"]');
    expect(inputElement).toBeTruthy();
    expect(inputElement?.getAttribute('placeholder')).toBe('Enter email');
  });
}); 