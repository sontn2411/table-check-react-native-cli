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
}

export const CATEGORIES = [
  { 
    id: 'all', 
    name: 'Tất cả', 
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    id: '1', 
    name: 'Sushi', 
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    id: '2', 
    name: 'Pizza', 
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    id: '3', 
    name: 'BBQ', 
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    id: '4', 
    name: 'Cafe', 
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    id: '5', 
    name: 'Burger', 
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    id: '6', 
    name: 'Hotpot', 
    image: 'https://images.unsplash.com/photo-1552590635-27c2c2128b15?auto=format&fit=crop&w=200&q=80' 
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
    priceRange: '200k - 500k',
    distance: '1.2 km',
    address: 'Tầng 5, Vincom Bà Triệu, Hai Bà Trưng, Hà Nội',
    isFeatured: true,
  },
  {
    id: '2',
    name: "Pizza 4P's - Phan Kế Bính",
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 512,
    category: 'Pizza',
    priceRange: '150k - 400k',
    distance: '2.5 km',
    address: '5 Phan Kế Bính, Ba Đình, Hà Nội',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Gogi House - Mipec Savico',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 320,
    category: 'BBQ',
    priceRange: '250k - 600k',
    distance: '4.1 km',
    address: 'Tầng 1, Mipec Savico, Long Biên, Hà Nội',
    isFeatured: false,
  },
  {
    id: '4',
    name: 'The Coffee House',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    reviews: 1500,
    category: 'Cafe',
    priceRange: '40k - 90k',
    distance: '0.5 km',
    address: '12 Cầu Giấy, Hà Nội',
    isFeatured: false,
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
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=80',
    code: 'TECH100',
  },
  {
    id: '2',
    title: 'Tặng Voucher 200k tại Pizza 4P\'s',
    subtitle: 'Dành cho khách hàng thân thiết',
    date: '01/06 - 15/06/2026',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    code: 'P4P200',
  },
  {
    id: '3',
    title: 'Mua 1 Tặng 1 Buffet tối',
    subtitle: 'Đi 2 tính tiền 1 tại Gogi House',
    date: '10/05 - 20/05/2026',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    code: 'GOGIBOGO',
  },
];

export const NEWS = [
  {
    id: '1',
    title: 'Khai trương chi nhánh mới tại Vincom Mega Mall Thảo Điền',
    summary: 'Ưu đãi cực khủng trong tuần đầu khai trương, giảm ngay 30% cho toàn bộ thực đơn buffet.',
    date: '10/05/2026',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    category: 'Sự kiện',
  },
  {
    id: '2',
    title: 'Top 5 nhà hàng Sushi "đáng đồng tiền bát gạo" nhất Hà Nội',
    summary: 'Bạn là tín đồ của món Nhật? Đừng bỏ lỡ danh sách những nhà hàng Sushi cực phẩm này.',
    date: '08/05/2026',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    category: 'Ẩm thực',
  },
  {
    id: '3',
    title: 'Cách đặt bàn nhanh chóng và nhận ưu đãi độc quyền trên TableCheck',
    summary: 'Hướng dẫn chi tiết cách sử dụng app TableCheck để tối ưu hóa trải nghiệm đi ăn của bạn.',
    date: '05/05/2026',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    category: 'Mẹo hay',
  },
];
