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
	_id: string;
	_rev: string;
	role: Index<string>; // employee, researcher, or something else. Default is 'none'
	name: Index<string>; // First Last
	email?: Index<string>;
	phoneNumber?: string;
	addressMailing?: string|Address;
	addressPhysical?: string|Address;
}

interface Employee extends Person {
	role: "employee";
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

interface Researcher extends Person {
	role: "researcher";
	position: string;
	faculty: string;
	department: string;
	labWebsite: string;
	expertise: string;
	coursesTaught: string;
	projects: string;
}
```
