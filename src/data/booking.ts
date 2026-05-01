export const LOCATIONS = [
  'Vị trí hiện tại',
  'Nha Trang, Khánh Hòa',
  'Hoàn Kiếm, Hà Nội',
  'Ba Đình, Hà Nội',
  'Cầu Giấy, Hà Nội',
  'Hai Bà Trưng, Hà Nội',
  'Đống Đa, Hà Nội',
  'Tây Hồ, Hà Nội',
  'Long Biên, Hà Nội',
  'Thanh Xuân, Hà Nội',
  'Quận 1, TP. HCM',
  'Quận 3, TP. HCM',
  'Quận 7, TP. HCM',
  'Thủ Đức, TP. HCM',
  'Hải Châu, Đà Nẵng',
];

export const LOCATION_COORDS: Record<string, { lat: number, lng: number }> = {
  'Nha Trang, Khánh Hòa': { lat: 12.2388, lng: 109.1968 },
  'Hoàn Kiếm, Hà Nội': { lat: 21.0285, lng: 105.8542 },
  'Ba Đình, Hà Nội': { lat: 21.0388, lng: 105.8200 },
  'Cầu Giấy, Hà Nội': { lat: 21.0285, lng: 105.7942 },
  'Hai Bà Trưng, Hà Nội': { lat: 21.0094, lng: 105.8412 },
  'Đống Đa, Hà Nội': { lat: 21.0245, lng: 105.8412 },
  'Long Biên, Hà Nội': { lat: 21.0512, lng: 105.8777 },
};

export const ALL_TIMES = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00'
];

export const GUEST_OPTIONS = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '> 10'
];
