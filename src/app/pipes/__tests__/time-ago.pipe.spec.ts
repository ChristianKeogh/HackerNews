import { TimeAgoPipe } from '../time-ago.pipe';

describe('TimeAgoPipe', () => {
  let pipe: TimeAgoPipe;

  beforeEach(() => {
    pipe = new TimeAgoPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if timestamp is falsy', () => {
    expect(pipe.transform(0)).toBe('');
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should return "just now" if less than one minute ago', () => {
    const now = Date.now();
    const oneSecondAgo = Math.floor((now - 1000) / 1000); // 1s ago
    expect(pipe.transform(oneSecondAgo)).toBe('just now');
  });

  it('should return "1 minute ago" for exactly one minute ago', () => {
    const now = Date.now();
    const oneMinuteAgo = Math.floor((now - 60000) / 1000);
    expect(pipe.transform(oneMinuteAgo)).toBe('1 minute ago');
  });

  it('should return plural "minutes ago" for more than one minute', () => {
    const now = Date.now();
    const fiveMinutesAgo = Math.floor((now - 5 * 60000) / 1000);
    expect(pipe.transform(fiveMinutesAgo)).toBe('5 minutes ago');
  });

  it('should return "1 hour ago" for exactly one hour ago', () => {
    const now = Date.now();
    const oneHourAgo = Math.floor((now - 3600000) / 1000);
    expect(pipe.transform(oneHourAgo)).toBe('1 hour ago');
  });

  it('should return plural "hours ago" for multiple hours', () => {
    const now = Date.now();
    const threeHoursAgo = Math.floor((now - 3 * 3600000) / 1000);
    expect(pipe.transform(threeHoursAgo)).toBe('3 hours ago');
  });

  it('should return "1 day ago" for exactly one day ago', () => {
    const now = Date.now();
    const oneDayAgo = Math.floor((now - 86400000) / 1000);
    expect(pipe.transform(oneDayAgo)).toBe('1 day ago');
  });

  it('should return plural "days ago" for multiple days', () => {
    const now = Date.now();
    const fiveDaysAgo = Math.floor((now - 5 * 86400000) / 1000);
    expect(pipe.transform(fiveDaysAgo)).toBe('5 days ago');
  });
});
