// Define interfaces for better type safety
interface AgeResult {
  years: number;
  days: number;
}

interface PersianDate {
  year: number;
  month: number;
  day: number;
}

// Convert Gregorian date to Persian date
export const toPersianDate = (date: Date): string => {
  const gregorianToJalaali = (gy: number, gm: number, gd: number): [number, number, number] => {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = gy <= 1600 ? 0 : 979;
    gy -= gy <= 1600 ? 621 : 1600;
    let gy2 = gm > 2 ? gy + 1 : gy;
    let days =
      365 * gy +
      Math.floor((gy2 + 3) / 4) -
      Math.floor((gy2 + 99) / 100) +
      Math.floor((gy2 + 399) / 400) -
      80 +
      gd +
      g_d_m[gm - 1];
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    jy += Math.floor((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    let jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
    let jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
    return [jy, jm, jd];
  };

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const [jy, jm, jd] = gregorianToJalaali(year, month, day);

  return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
};

// Convert Persian date to Gregorian date
export const persianToGregorian = (persianDate: string): string => {
  const jalaaliToGregorian = (jy: number, jm: number, jd: number): [number, number, number] => {
    jy += 1595;
    let days =
      -355668 +
      365 * jy +
      Math.floor(jy / 33) * 8 +
      Math.floor(((jy % 33) + 3) / 4) +
      jd +
      (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
    let gy = 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * Math.floor(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      gy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    let gd = days + 1;
    const sal_a = [
      0,
      31,
      (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    let gm;
    for (gm = 0; gm < 13; gm++) {
      let v = sal_a[gm];
      if (gd <= v) break;
      gd -= v;
    }
    return [gy, gm, gd];
  };

  try {
    const parts = persianDate.split('/').map((part) => parseInt(part, 10));
    if (parts.length !== 3 || parts.some(isNaN)) {
      throw new Error('Invalid Persian date format. Expected YYYY/MM/DD');
    }

    const [jy, jm, jd] = parts;
    const [gy, gm, gd] = jalaaliToGregorian(jy, jm, jd);

    return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
  } catch (error) {
    console.error('Error converting Persian date:', error);
    return '';
  }
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString('fa-IR');
  } catch {
    return dateString;
  }
};

/**
 * Calculate age from birthdate to current date
 * @param birthdate - Birthdate in string format (YYYY-MM-DD) or Date object
 * @returns Age object with years and days properties
 * @example
 * // Returns { years: 15, days: 32 }
 * calculateAge('2008-03-10');
 */
export function calculateAge(birthdate: string | Date): AgeResult {
  // Input validation
  if (!birthdate) {
    throw new Error('Birthdate is required');
  }

  let birthDate: Date;

  // Handle different input types
  if (birthdate instanceof Date) {
    birthDate = new Date(birthdate);
  } else if (typeof birthdate === 'string') {
    birthDate = new Date(birthdate);
  } else {
    throw new Error('Birthdate must be a Date object or string in YYYY-MM-DD format');
  }

  // Check if date is valid
  if (isNaN(birthDate.getTime())) {
    throw new Error('Invalid birthdate provided');
  }

  const currentDate = new Date();

  // Check if birthdate is in the future
  if (birthDate > currentDate) {
    throw new Error('Birthdate cannot be in the future');
  }

  // Calculate years
  let years = currentDate.getFullYear() - birthDate.getFullYear();

  // Calculate months and days difference
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  // Adjust years if birthday hasn't occurred this year
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  // Calculate days since last birthday
  const lastBirthday = new Date(
    currentDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  let totalDays = 0;

  if (currentDate < lastBirthday) {
    // If birthday hasn't occurred this year, calculate from last year's birthday
    const lastYearBirthday = new Date(
      currentDate.getFullYear() - 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
    totalDays = Math.floor(
      (currentDate.getTime() - lastYearBirthday.getTime()) / (1000 * 60 * 60 * 24)
    );
  } else {
    // Birthday has occurred this year
    totalDays = Math.floor(
      (currentDate.getTime() - lastBirthday.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  return {
    years: years,
    days: totalDays,
  };
}

// Alternative implementation using a more straightforward approach
export function calculateAgeSimple(birthdate: string | Date): AgeResult {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();

  if (isNaN(birthDate.getTime())) {
    throw new Error('Invalid birthdate');
  }

  if (birthDate > currentDate) {
    throw new Error('Birthdate cannot be in the future');
  }

  // Calculate total difference in milliseconds
  const diffTime = Math.abs(currentDate.getTime() - birthDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Calculate years
  const years = Math.floor(diffDays / 365.25);

  // Calculate remaining days
  const days = diffDays - Math.floor(years * 365.25);

  return {
    years: years,
    days: Math.round(days),
  };
}

// More precise implementation that handles leap years
export function calculateAgePrecise(birthdate: string | Date): AgeResult {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();

  if (isNaN(birthDate.getTime()) || birthDate > currentDate) {
    throw new Error('Invalid birthdate');
  }

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  // Adjust if current month/day is before birth month/day
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  // Calculate exact days since last birthday
  const lastBirthday = new Date(currentDate);
  lastBirthday.setFullYear(currentDate.getFullYear() - years);

  // If last birthday is in the future, adjust
  if (lastBirthday > currentDate) {
    years--;
    lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
  }

  const daysSinceBirthday = Math.floor(
    (currentDate.getTime() - lastBirthday.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    years: years,
    days: daysSinceBirthday,
  };
}

// Test function with examples
export function testAgeCalculator(): void {
  const testCases = [
    { birthdate: '2008-03-10' as string | Date, expected: { years: 15, days: 32 } },
    { birthdate: '2000-01-01' as string | Date, expected: 'should calculate correctly' },
    { birthdate: '1990-12-31' as string | Date, expected: 'should calculate correctly' },
    { birthdate: new Date('2010-06-15'), expected: 'should work with Date object' },
  ];

  console.log('Testing Age Calculator:');
  testCases.forEach((test, index) => {
    try {
      const result = calculateAge(test.birthdate);
      console.log(`Test ${index + 1}:`, {
        birthdate: test.birthdate,
        result: result,
        expected: test.expected,
      });
    } catch (error) {
      console.log(`Test ${index + 1} Error:`, (error as Error).message);
    }
  });
}

// Utility function to format age for display
export function formatAge(age: AgeResult | null | undefined): string {
  if (!age || typeof age.years !== 'number' || typeof age.days !== 'number') {
    return 'Invalid age';
  }

  if (age.years === 0) {
    return `${age.days} day${age.days !== 1 ? 's' : ''}`;
  }

  if (age.days === 0) {
    return `${age.years} year${age.years !== 1 ? 's' : ''}`;
  }

  return `${age.years} year${age.years !== 1 ? 's' : ''} and ${age.days} day${age.days !== 1 ? 's' : ''}`;
}

// Additional utility functions for Persian date handling
export const parsePersianDate = (persianDateStr: string): PersianDate | null => {
  try {
    const parts = persianDateStr.split('/').map((part) => parseInt(part, 10));
    if (parts.length !== 3 || parts.some(isNaN)) {
      return null;
    }
    return {
      year: parts[0],
      month: parts[1],
      day: parts[2],
    };
  } catch {
    return null;
  }
};

export const isValidPersianDate = (persianDateStr: string): boolean => {
  const date = parsePersianDate(persianDateStr);
  if (!date) return false;

  // Basic validation for Persian date
  return date.year > 0 && date.month >= 1 && date.month <= 12 && date.day >= 1 && date.day <= 31;
};

// Calculate age from Persian date
export function calculateAgeFromPersian(persianBirthdate: string): AgeResult {
  if (!isValidPersianDate(persianBirthdate)) {
    throw new Error('Invalid Persian birthdate');
  }

  const gregorianDate = persianToGregorian(persianBirthdate);
  if (!gregorianDate) {
    throw new Error('Failed to convert Persian date to Gregorian');
  }

  return calculateAge(gregorianDate);
}

// Run tests (uncomment when needed)
// testAgeCalculator();
