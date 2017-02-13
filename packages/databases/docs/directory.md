# Interfaces
```typescript
interface Address {
	addressCountry: string; // ie: USA, Canada
	addressLocality: string; // ie: Mountain View
	addressRegion: string; // ie: CA, BC
	postalCode: string;
	streetAddress: string;
}
enum EmploymentType { fullTime = 'fullTime', partTime = 'partTime' }
enum Day {
	sunday = 0,
	monday = 1,
	tuesday = 2,
	wednesday = 3,
	thursday = 4,
	friday = 5,
	saturday = 6
}

interface Person {
	_id: string; // `${role}/${name}/${hash}`
	_rev: string;
	role: string; // employee, researcher, or something else. Default is 'none'
	name: string; // First Last
	email?: string;
	phoneNumber?: string;
	addressMailing?: string|Address;
	addressPhysical?: string|Address;
}

interface Employee implements Person {
	pay?: number;
	employmentType?: EmploymentType;
	holidayDays?: Date[];
	sickDays?: Date[];
	paidLeaveDays?: Date[];
	inLieHours?: Date[];
	medicalLeaveTime?: Object;
	emergencyContact?: Person;
	workingDays?: Day[]; // set of days, should be unique
}

interface Researcher implements Person {
	position: string;
	faculty: string;
	department: string;
	labWebsite: string;
	expertise: string;
	coursesTaught: string;
	projects: string;
}
```
