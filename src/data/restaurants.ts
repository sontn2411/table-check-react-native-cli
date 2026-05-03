export interface MenuItem {
  name: string;
  price: string;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  priceRange: string;
  distance: string;
  address: string;
  isFeatured?: boolean;
  latitude?: number;
  longitude?: number;
  description?: string;
  phone?: string;
  openingHours?: string;
  images?: string[];
  menu?: MenuItem[];
  amenities?: string[];
}

export const CATEGORIES = [
  {
    id: 'all',
    name: 'Tất cả',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '1',
    name: 'Sushi',
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    name: 'Pizza',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    name: 'BBQ',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '4',
    name: 'Cafe',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '5',
    name: 'Burger',
    image:
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '6',
    name: 'Hotpot',
    image:
      'https://images.unsplash.com/photo-1552590635-27c2c2128b15?auto=format&fit=crop&w=200&q=80',
  },
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Sushi Way - Vincom Bà Triệu',
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 124,
    category: 'Sushi',
    priceRange: '200.000đ - 500.000đ',
    distance: '1.2 km',
    address: 'Hai Bà Trưng, Hà Nội',
    isFeatured: true,
    latitude: 21.0094,
    longitude: 105.8412,
    description:
      'Sushi Way mang đến trải nghiệm ẩm thực Nhật Bản đích thực với nguyên liệu tươi sống nhập khẩu trực tiếp. Không gian sang trọng, phục vụ chuyên nghiệp, thực đơn đa dạng từ sashimi, nigiri đến các set combo đặc biệt.',
    phone: '024 3978 1234',
    openingHours: '10:00 - 22:00',
    images: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Sashimi Tổng Hợp',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Set Nigiri Đặc Biệt',
        price: '280.000đ',
        image:
          'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tempura Tôm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Ramen Tonkotsu',
        price: '150.000đ',
        image:
          'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80',
      },
    ],
    amenities: [
      'wifi',
      'parking',
      'privateRoom',
      'airConditioner',
      'nonsmoking',
    ],
  },
  {
    id: '2',
    name: "Pizza 4P's - Phan Kế Bính",
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 512,
    category: 'Pizza',
    priceRange: '150.000đ - 400.000đ',
    distance: '2.5 km',
    address: 'Ba Đình, Hà Nội',
    isFeatured: true,
    latitude: 21.043,
    longitude: 105.82,
    description:
      "Pizza 4P's nổi tiếng với pizza nướng lò củi truyền thống Ý kết hợp nguyên liệu tươi ngon từ trang trại riêng. Phô mai mozzarella tự làm tại chỗ, không gian hiện đại và ấm cúng.",
    phone: '024 3266 4545',
    openingHours: '10:00 - 22:30',
    images: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Burrata Pizza',
        price: '295.000đ',
        image:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Parma Ham Pizza',
        price: '275.000đ',
        image:
          'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cream Cheese Pasta',
        price: '195.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
    ],
    amenities: ['wifi', 'parking', 'airConditioner', 'nonsmoking'],
  },
  {
    id: '3',
    name: 'Gogi House - Mipec Savico',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 320,
    category: 'BBQ',
    priceRange: '250.000đ - 600.000đ',
    distance: '4.1 km',
    address: 'Long Biên, Hà Nội',
    isFeatured: false,
    latitude: 21.0512,
    longitude: 105.8777,
    description:
      'Thịt nướng Hàn Quốc thượng hạng với không gian mang đậm phong cách đường phố Seoul.',
    phone: '024 7300 8888',
    openingHours: '10:00 - 22:00',
    amenities: ['wifi', 'parking', 'airConditioner'],
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: '4',
    name: 'The Coffee House - Cầu Giấy',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    reviews: 1500,
    category: 'Cafe',
    priceRange: '40.000đ - 90.000đ',
    distance: '0.5 km',
    address: 'Cầu Giấy, Hà Nội',
    isFeatured: false,
    latitude: 21.0285,
    longitude: 105.7942,
    description:
      'Không gian làm việc lý tưởng cùng những ly cà phê Việt Nam chất lượng.',
    phone: '1800 6936',
    openingHours: '07:00 - 22:30',
    amenities: ['wifi', 'airConditioner', 'nonsmoking'],
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: '5',
    name: 'Dim Sum House - Hoàn Kiếm',
    image:
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 89,
    category: 'Dimsum',
    priceRange: '100.000đ - 300.000đ',
    distance: '0.8 km',
    address: 'Hoàn Kiếm, Hà Nội',
    isFeatured: true,
    latitude: 21.0285,
    longitude: 105.8542,
    description:
      'Tinh hoa ẩm thực Trung Hoa với hơn 50 loại Dimsum được chế biến tươi mỗi ngày.',
    phone: '024 1234 5678',
    openingHours: '09:00 - 21:00',
    amenities: ['wifi', 'parking', 'privateRoom'],
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: '6',
    name: 'Grill & Chill - Đống Đa',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 210,
    category: 'Steak',
    priceRange: '300.000đ - 800.000đ',
    distance: '2.1 km',
    address: 'Đống Đa, Hà Nội',
    isFeatured: false,
    latitude: 21.0245,
    longitude: 105.8412,
    description:
      'Thưởng thức steak hảo hạng trong không gian rooftop view toàn thành phố.',
    phone: '090 123 4567',
    openingHours: '17:00 - 23:30',
    amenities: ['wifi', 'parking', 'airConditioner'],
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: '7',
    name: 'Manwah - Lotte Liễu Giai',
    image:
      'https://images.unsplash.com/photo-1552590635-27c2c2128b15?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 430,
    category: 'Hotpot',
    priceRange: '300.000đ - 500.000đ',
    distance: '3.0 km',
    address: 'Ba Đình, Hà Nội',
    isFeatured: true,
    latitude: 21.0388,
    longitude: 105.82,
    description:
      'Lẩu Đài Loan cao cấp với nước lẩu ngọt thanh và thịt bò Wagyu tuyệt hảo.',
    phone: '024 9999 8888',
    openingHours: '10:00 - 22:00',
    amenities: ['wifi', 'parking', 'privateRoom', 'airConditioner'],
    images: [
      'https://images.unsplash.com/photo-1552590635-27c2c2128b15?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: '8',
    name: 'Bún Chả Hương Liên',
    image:
      'https://images.unsplash.com/photo-1562607378-d7bb74187313?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 2500,
    category: 'Việt Nam',
    priceRange: '50.000đ - 150.000đ',
    distance: '1.5 km',
    address: 'Hai Bà Trưng, Hà Nội',
    isFeatured: false,
    latitude: 21.0155,
    longitude: 105.8466,
    description: 'Quán bún chả nổi tiếng từng đón cựu Tổng thống Mỹ Obama.',
    phone: '024 3943 4106',
    openingHours: '08:00 - 20:30',
    amenities: ['parking', 'airConditioner'],
    images: [
      'https://images.unsplash.com/photo-1562607378-d7bb74187313?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  // --- NHA TRANG RESTAURANTS ---
  {
    id: '9',
    name: 'Sailing Club Nha Trang',
    image:
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 1200,
    category: 'Cafe',
    priceRange: '150.000đ - 500.000đ',
    distance: '0.5 km',
    address: '72-74 Trần Phú, Nha Trang, Khánh Hòa',
    isFeatured: true,
    latitude: 12.2356,
    longitude: 109.1969,
    description: 'Không gian thư giãn sát bãi biển tuyệt đẹp tại Nha Trang.',
    phone: '0258 3524 628',
    openingHours: '07:00 - 02:00',
    amenities: ['wifi', 'parking', 'nonsmoking'],
    images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: '10',
    name: 'Louisiane Brewhouse',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 850,
    category: 'Pizza',
    priceRange: '200.000đ - 600.000đ',
    distance: '1.2 km',
    address: 'Lô 29 Trần Phú, Nha Trang, Khánh Hòa',
    isFeatured: false,
    latitude: 12.2322,
    longitude: 109.1965,
    description:
      'Thưởng thức bia tươi craft và pizza hải sản trên bãi biển Nha Trang.',
    phone: '0258 3521 948',
    openingHours: '08:00 - 24:00',
    amenities: ['wifi', 'parking', 'airConditioner'],
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: '11',
    name: 'Costa Seafood',
    image:
      'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 420,
    category: 'Hải Sản',
    priceRange: '500.000đ - 1.500.000đ',
    distance: '0.8 km',
    address: '32-34 Trần Phú, Nha Trang, Khánh Hòa',
    isFeatured: true,
    latitude: 12.2452,
    longitude: 109.1968,
    description:
      'Hải sản tươi sống bậc nhất Nha Trang với chuẩn chế biến 5 sao.',
    phone: '0258 3737 777',
    openingHours: '06:00 - 22:00',
    amenities: ['wifi', 'parking', 'privateRoom', 'airConditioner'],
    images: [
      'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: '12',
    name: 'Bò Né Lạc Cảnh',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 2100,
    category: 'BBQ',
    priceRange: '100.000đ - 300.000đ',
    distance: '2.5 km',
    address: '44 Nguyễn Bỉnh Khiêm, Nha Trang, Khánh Hòa',
    isFeatured: false,
    latitude: 12.2536,
    longitude: 109.1964,
    description:
      'Thương hiệu bò nướng lâu đời và nổi tiếng nhất tại Nha Trang.',
    phone: '0258 3821 391',
    openingHours: '10:00 - 23:00',
    amenities: ['parking', 'airConditioner'],
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: '13',
    name: 'Gogi House - Ariyana Nha Trang',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 320,
    category: 'BBQ',
    priceRange: '250.000đ - 600.000đ',
    distance: '1.0 km',
    address: '18 Trần Hưng Đạo, Nha Trang, Khánh Hòa',
    isFeatured: false,
    latitude: 12.2415,
    longitude: 109.1931,
    description: 'Thịt nướng Hàn Quốc thượng hạng tại trung tâm Nha Trang.',
    phone: '0258 7300 111',
    openingHours: '10:00 - 22:00',
    amenities: ['wifi', 'parking', 'airConditioner'],
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: '14',
    name: 'Nha Trang View Restaurant',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviews: 530,
    category: 'Cafe',
    priceRange: '50.000đ - 200.000đ',
    distance: '3.1 km',
    address: 'Lầu Ông Tư, Trần Phú, Nha Trang, Khánh Hòa',
    isFeatured: false,
    latitude: 12.2612,
    longitude: 109.1985,
    description:
      'Tận hưởng hải sản và đồ uống với view biển toàn cảnh tuyệt đẹp.',
    phone: '090 123 4567',
    openingHours: '06:30 - 23:30',
    amenities: ['wifi', 'parking', 'airConditioner'],
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    ],
    menu: [
      {
        name: 'Thăn bò Úc áp chảo',
        price: '350.000đ',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mỳ Ý sốt kem nấm',
        price: '180.000đ',
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Cá hồi áp chảo',
        price: '290.000đ',
        image:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tiramisu',
        price: '120.000đ',
        image:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
];

export const BANNERS = [
  {
    id: '1',
    title: 'Giảm tới 50%',
    subtitle: 'Khi đặt bàn qua TableCheck',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    title: 'Buffet Sushi',
    subtitle: 'Thưởng thức không giới hạn',
    image:
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    title: 'Lãng mạn đêm tiệc',
    subtitle: 'Combo dành riêng cho cặp đôi',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
  },
];

export const OFFERS = [
  {
    id: '1',
    title: 'Giảm 100k cho chủ thẻ Techcombank',
    subtitle: 'Áp dụng cho hóa đơn từ 1 triệu',
    date: '20/05 - 31/05/2026',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=80',
    code: 'TECH100',
  },
  {
    id: '2',
    title: "Tặng Voucher 200k tại Pizza 4P's",
    subtitle: 'Dành cho khách hàng thân thiết',
    date: '01/06 - 15/06/2026',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    code: 'P4P200',
  },
  {
    id: '3',
    title: 'Mua 1 Tặng 1 Buffet tối',
    subtitle: 'Đi 2 tính tiền 1 tại Gogi House',
    date: '10/05 - 20/05/2026',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    code: 'GOGIBOGO',
  },
];

export const NEWS = [
  {
    id: '1',
    title: 'Khai trương chi nhánh mới tại Vincom Mega Mall Thảo Điền',
    summary:
      'Ưu đãi cực khủng trong tuần đầu khai trương, giảm ngay 30% cho toàn bộ thực đơn buffet.',
    date: '10/05/2026',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    category: 'Sự kiện',
  },
  {
    id: '2',
    title: 'Top 5 nhà hàng Sushi "đáng đồng tiền bát gạo" nhất Hà Nội',
    summary:
      'Bạn là tín đồ của món Nhật? Đừng bỏ lỡ danh sách những nhà hàng Sushi cực phẩm này.',
    date: '08/05/2026',
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    category: 'Ẩm thực',
  },
  {
    id: '3',
    title: 'Cách đặt bàn nhanh chóng và nhận ưu đãi độc quyền trên TableCheck',
    summary:
      'Hướng dẫn chi tiết cách sử dụng app TableCheck để tối ưu hóa trải nghiệm đi ăn của bạn.',
    date: '05/05/2026',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    category: 'Mẹo hay',
  },
];
