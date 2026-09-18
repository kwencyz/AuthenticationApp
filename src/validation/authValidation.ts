const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(name: string): string | null {
    if (!name.trim()) return 'Name is required';
    return null;
}

export function validateEmail(email: string): string | null {
    if (!email.trim()) return 'Email is required';
    if (!EMAIL_REGEX.test(email.trim())) return 'Invalid email format';
    return null;
}

export function validateLoginPassword(password: string): string | null {
    if (!password) return 'Password is required';
    return null;
}

export function validateSignupPassword(password: string): string | null {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
}
