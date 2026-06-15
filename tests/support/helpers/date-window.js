import { DateTime } from 'luxon';

// create deterministic UTC date window for booking scenarios
export const futureWindow = (startInDays = 1400, nights = 2) => {
  const checkin = DateTime.utc().plus({ days: startInDays }).toISODate();
  const checkout = DateTime.utc().plus({ days: startInDays + nights }).toISODate();
  return { checkin, checkout };
};
