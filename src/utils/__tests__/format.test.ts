import { formatDate, formatRelativeDate, formatScore, formatCount } from '../format';

describe('formatDate', () => {
  it('formats a date string', () => {
    const result = formatDate('2024-03-15T12:00:00Z');
    expect(result).toMatch(/Mar/);
    expect(result).toMatch(/15/);
    expect(result).toMatch(/2024/);
  });
});

describe('formatRelativeDate', () => {
  it('returns "Just now" for very recent dates', () => {
    const now = new Date().toISOString();
    expect(formatRelativeDate(now)).toBe('Just now');
  });

  it('returns minutes ago for recent dates', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60000).toISOString();
    expect(formatRelativeDate(fiveMinAgo)).toBe('5m ago');
  });

  it('returns hours ago', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 3600000).toISOString();
    expect(formatRelativeDate(threeHoursAgo)).toBe('3h ago');
  });

  it('returns days ago for less than a week', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString();
    expect(formatRelativeDate(twoDaysAgo)).toBe('2d ago');
  });

  it('returns formatted date for older dates', () => {
    const oldDate = new Date(Date.now() - 30 * 86400000).toISOString();
    const result = formatRelativeDate(oldDate);
    expect(result).not.toContain('ago');
  });
});

describe('formatScore', () => {
  it('formats score with default max', () => {
    expect(formatScore(8)).toBe('8/10');
  });

  it('formats score with custom max', () => {
    expect(formatScore(4, 5)).toBe('4/5');
  });
});

describe('formatCount', () => {
  it('returns number as string for small counts', () => {
    expect(formatCount(42)).toBe('42');
  });

  it('formats thousands', () => {
    expect(formatCount(1500)).toBe('1.5K');
  });

  it('formats millions', () => {
    expect(formatCount(2500000)).toBe('2.5M');
  });

  it('handles zero', () => {
    expect(formatCount(0)).toBe('0');
  });
});
