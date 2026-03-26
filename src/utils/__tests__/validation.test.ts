import {
  signUpSchema,
  signInSchema,
  profileSchema,
  reviewSchema,
  reviewItemSchema,
  collectionSchema,
} from '../validation';

describe('signUpSchema', () => {
  it('accepts valid input', () => {
    const result = signUpSchema.safeParse({
      email: 'test@example.com',
      password: 'Password1',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = signUpSchema.safeParse({
      email: 'not-an-email',
      password: 'Password1',
    });
    expect(result.success).toBe(false);
  });

  it('rejects short password', () => {
    const result = signUpSchema.safeParse({
      email: 'test@example.com',
      password: 'Pass1',
    });
    expect(result.success).toBe(false);
  });

  it('rejects password without uppercase', () => {
    const result = signUpSchema.safeParse({
      email: 'test@example.com',
      password: 'password1',
    });
    expect(result.success).toBe(false);
  });

  it('rejects password without number', () => {
    const result = signUpSchema.safeParse({
      email: 'test@example.com',
      password: 'Passwordd',
    });
    expect(result.success).toBe(false);
  });
});

describe('signInSchema', () => {
  it('accepts valid input', () => {
    const result = signInSchema.safeParse({
      email: 'test@example.com',
      password: 'any',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty password', () => {
    const result = signInSchema.safeParse({
      email: 'test@example.com',
      password: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('profileSchema', () => {
  it('accepts valid profile', () => {
    const result = profileSchema.safeParse({
      username: 'johndoe',
      display_name: 'John Doe',
    });
    expect(result.success).toBe(true);
  });

  it('accepts profile with bio', () => {
    const result = profileSchema.safeParse({
      username: 'johndoe',
      display_name: 'John Doe',
      bio: 'Food lover',
    });
    expect(result.success).toBe(true);
  });

  it('rejects short username', () => {
    const result = profileSchema.safeParse({
      username: 'ab',
      display_name: 'John',
    });
    expect(result.success).toBe(false);
  });

  it('rejects username with special chars', () => {
    const result = profileSchema.safeParse({
      username: 'john doe!',
      display_name: 'John',
    });
    expect(result.success).toBe(false);
  });

  it('rejects bio over 160 chars', () => {
    const result = profileSchema.safeParse({
      username: 'johndoe',
      display_name: 'John',
      bio: 'x'.repeat(161),
    });
    expect(result.success).toBe(false);
  });
});

describe('reviewSchema', () => {
  it('accepts valid review', () => {
    const result = reviewSchema.safeParse({
      place_id: 'uuid-123',
      visit_date: '2024-01-15',
      overall_score: 8,
      is_private: false,
    });
    expect(result.success).toBe(true);
  });

  it('rejects score out of range', () => {
    const result = reviewSchema.safeParse({
      place_id: 'uuid-123',
      visit_date: '2024-01-15',
      overall_score: 11,
      is_private: false,
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing place_id', () => {
    const result = reviewSchema.safeParse({
      place_id: '',
      visit_date: '2024-01-15',
      overall_score: 5,
      is_private: false,
    });
    expect(result.success).toBe(false);
  });
});

describe('reviewItemSchema', () => {
  it('accepts valid dish', () => {
    const result = reviewItemSchema.safeParse({
      name: 'Margherita Pizza',
      category: 'dish',
    });
    expect(result.success).toBe(true);
  });

  it('accepts item with score', () => {
    const result = reviewItemSchema.safeParse({
      name: 'Old Fashioned',
      category: 'drink',
      score: 9,
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = reviewItemSchema.safeParse({
      name: '',
      category: 'dish',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid category', () => {
    const result = reviewItemSchema.safeParse({
      name: 'Salad',
      category: 'appetizer',
    });
    expect(result.success).toBe(false);
  });
});

describe('collectionSchema', () => {
  it('accepts valid collection', () => {
    const result = collectionSchema.safeParse({
      name: 'Date Night Spots',
      is_public: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = collectionSchema.safeParse({
      name: '',
      is_public: true,
    });
    expect(result.success).toBe(false);
  });
});
