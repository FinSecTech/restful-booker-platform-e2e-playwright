import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

// create unique IDs for test data isolation
export const uid = (prefix = 'E2E') => {
  const stamp = DateTime.utc().toFormat('yyyyLLddHHmmss');
  return `${prefix}-${stamp}-${faker.number.int({ min: 1000, max: 9999 })}`;
};

// build auth cookie header for protected API calls
export const authCookie = token => ({ Cookie: `token=${token}` });

// build a deterministic booking window in UTC dates
export const bookingWindow = ({ startInDays = 14, nights = 2 } = {}) => {
  const checkinDate = DateTime.utc().plus({ days: startInDays }).startOf('day');
  const checkoutDate = checkinDate.plus({ days: nights });

  return {
    checkin: checkinDate.toISODate(),
    checkout: checkoutDate.toISODate(),
  };
};

// build random but valid phone number
export const randomPhone = () => faker.string.numeric(11);

// build valid guest payload for checkout form
export const buildGuestData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email().toLowerCase(),
  phone: randomPhone(),
});

// build valid booking payload for API scenarios
export const buildBookingPayload = ({
  roomid = 1,
  checkin,
  checkout,
  firstname,
  lastname,
  email,
  phone,
  depositpaid = false,
} = {}) => {
  const window = checkin && checkout ? { checkin, checkout } : bookingWindow();

  return {
    roomid,
    firstname: firstname || faker.person.firstName(),
    lastname: lastname || faker.person.lastName(),
    depositpaid,
    email: email || faker.internet.email().toLowerCase(),
    phone: phone || randomPhone(),
    bookingdates: {
      checkin: window.checkin,
      checkout: window.checkout,
    },
  };
};

// build contact form payload
export const buildMessagePayload = ({ subjectSuffix = uid('MSG'), description } = {}) => ({
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  phone: randomPhone(),
  subject: `Subject ${subjectSuffix}`,
  description: description || faker.lorem.sentence(12),
});

// build room creation payload
export const buildRoomPayload = ({ roomName = uid('ROOM') } = {}) => ({
  roomName,
  type: faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
  accessible: faker.datatype.boolean(),
  roomPrice: faker.number.int({ min: 90, max: 350 }),
  features: faker.helpers.arrayElements(['WiFi', 'TV', 'Radio', 'Safe', 'Refreshments', 'Views'], { min: 2, max: 4 }),
  description: faker.lorem.sentences(2),
  image: '/images/room1.jpg',
});

// build random branding name
export const randomBrandingName = () => `Shady Meadows ${faker.company.buzzNoun()} ${uid('BR')}`;
