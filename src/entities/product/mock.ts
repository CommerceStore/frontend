import type { Product } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  // 고급 선물세트
  {
    id: "prod-001",
    name: "담은 고급형 수제 선물세트",
    description: "정성스럽게 만든 프리미엄 수제 선물세트",
    price: 45000,
    originalPrice: 55000,
    stock: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400&h=400&fit=crop",
    category: "식품",
    createdAt: "2026-01-20T00:00:00Z",
    updatedAt: "2026-01-26T00:00:00Z",
  },
  {
    id: "prod-002",
    name: "고급형감사선물 도라지정과",
    description: "국내산 도라지로 만든 고급 정과",
    price: 35000,
    stock: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=400&fit=crop",
    category: "건강",
    createdAt: "2026-01-18T00:00:00Z",
    updatedAt: "2026-01-25T00:00:00Z",
  },
  {
    id: "prod-003",
    name: "고급형선물 수제쌀전병",
    description: "100% 국내산 쌀로 만든 수제 전병",
    price: 28000,
    stock: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=400&fit=crop",
    category: "디저트",
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-24T00:00:00Z",
  },
  {
    id: "prod-004",
    name: "고급명절선물 흑도라지정과",
    description: "명절 선물로 제격인 흑도라지 정과",
    price: 42000,
    originalPrice: 50000,
    stock: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&h=400&fit=crop",
    category: "건강",
    createdAt: "2026-01-22T00:00:00Z",
    updatedAt: "2026-01-26T00:00:00Z",
  },
  {
    id: "prod-005",
    name: "고급형감사선물 인후단",
    description: "목 건강에 좋은 프리미엄 인후단",
    price: 38000,
    stock: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    category: "건강",
    createdAt: "2026-01-19T00:00:00Z",
    updatedAt: "2026-01-25T00:00:00Z",
  },

  // 도시락 및 식품
  {
    id: "prod-006",
    name: "담은 수제 단체 도시락",
    description: "단체 행사용 프리미엄 도시락 (10인분)",
    price: 85000,
    stock: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop",
    category: "식품",
    createdAt: "2026-01-16T00:00:00Z",
    updatedAt: "2026-01-23T00:00:00Z",
  },
  {
    id: "prod-007",
    name: "수제 양념장 맛간장 선물세트",
    description: "전통 방식으로 숙성한 양념장 세트",
    price: 32000,
    stock: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop",
    category: "식품",
    createdAt: "2026-01-14T00:00:00Z",
    updatedAt: "2026-01-22T00:00:00Z",
  },

  // 과일 선물세트
  {
    id: "prod-008",
    name: "점보사이즈 골드키위 선물세트",
    description: "프리미엄 뉴질랜드산 골드키위",
    price: 55000,
    originalPrice: 65000,
    stock: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&h=400&fit=crop",
    category: "식품",
    createdAt: "2026-01-23T00:00:00Z",
    updatedAt: "2026-01-26T00:00:00Z",
  },

  // 축산 선물세트
  {
    id: "prod-009",
    name: "한우선물세트",
    description: "1++ 등급 한우 프리미엄 세트",
    price: 120000,
    originalPrice: 150000,
    stock: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=400&fit=crop",
    category: "식품",
    createdAt: "2026-01-21T00:00:00Z",
    updatedAt: "2026-01-26T00:00:00Z",
  },

  // 생활용품
  {
    id: "prod-010",
    name: "단체선물 송월타올 골프우산",
    description: "송월 프리미엄 타올과 골프우산 세트",
    price: 48000,
    stock: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
    category: "생활",
    createdAt: "2026-01-17T00:00:00Z",
    updatedAt: "2026-01-24T00:00:00Z",
  },
  {
    id: "prod-011",
    name: "호주산 양모이불",
    description: "100% 호주산 양모로 만든 프리미엄 이불",
    price: 95000,
    originalPrice: 120000,
    stock: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
    category: "생활",
    createdAt: "2026-01-12T00:00:00Z",
    updatedAt: "2026-01-20T00:00:00Z",
  },
  {
    id: "prod-012",
    name: "쉬젤텀블러",
    description: "보온보냉 기능이 뛰어난 프리미엄 텀블러",
    price: 28000,
    stock: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1534656116045-5ee5ec8d3e81?w=400&h=400&fit=crop",
    category: "생활",
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-01-18T00:00:00Z",
  },
  {
    id: "prod-013",
    name: "블루밍 침구청소기",
    description: "강력한 흡입력의 침구 청소기",
    price: 68000,
    originalPrice: 85000,
    stock: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop",
    category: "생활",
    createdAt: "2026-01-13T00:00:00Z",
    updatedAt: "2026-01-21T00:00:00Z",
  },

  // 주방 가전
  {
    id: "prod-014",
    name: "디라이프두유제조기",
    description: "신선한 두유를 집에서 간편하게",
    price: 78000,
    stock: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    category: "생활",
    createdAt: "2026-01-11T00:00:00Z",
    updatedAt: "2026-01-19T00:00:00Z",
  },
  {
    id: "prod-015",
    name: "에피카두유제조기",
    description: "다기능 스마트 두유제조기",
    price: 89000,
    originalPrice: 110000,
    stock: 28,
    imageUrl:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop",
    category: "생활",
    createdAt: "2026-01-09T00:00:00Z",
    updatedAt: "2026-01-17T00:00:00Z",
  },

  // 견과류
  {
    id: "prod-016",
    name: "국산호두 선물세트",
    description: "100% 국내산 프리미엄 호두",
    price: 42000,
    stock: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1591021643318-9c0fc2d87ba7?w=400&h=400&fit=crop",
    category: "식품",
    createdAt: "2026-01-08T00:00:00Z",
    updatedAt: "2026-01-16T00:00:00Z",
  },

  // 김 선물세트
  {
    id: "prod-017",
    name: "광천김 캔 선물세트",
    description: "명절 선물 1순위, 광천김 프리미엄 세트",
    price: 38000,
    stock: 70,
    imageUrl:
      "https://images.unsplash.com/photo-1579003593419-98f949b9398f?w=400&h=400&fit=crop",
    category: "식품",
    createdAt: "2026-01-07T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },

  {
    id: "prod-018",
    name: "프리미엄 녹차 티백 세트",
    description: "선물용 고급 녹차 티백",
    price: 8900,
    stock: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
    category: "음료",
    createdAt: "2026-01-06T00:00:00Z",
    updatedAt: "2026-01-14T00:00:00Z",
  },
  {
    id: "prod-019",
    name: "수제 쿠키 선물세트",
    description: "정성껏 구운 수제 쿠키",
    price: 9500,
    stock: 90,
    imageUrl:
      "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400&h=400&fit=crop",
    category: "디저트",
    createdAt: "2026-01-05T00:00:00Z",
    updatedAt: "2026-01-13T00:00:00Z",
  },
  {
    id: "prod-020",
    name: "프리미엄 올리브유 세트",
    description: "이탈리아산 엑스트라버진 올리브유",
    price: 15000,
    stock: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=400&h=400&fit=crop",
    category: "식품",
    createdAt: "2026-01-04T00:00:00Z",
    updatedAt: "2026-01-12T00:00:00Z",
  },
  {
    id: "prod-021",
    name: "허브차 컬렉션 세트",
    description: "다양한 허브차가 담긴 선물세트",
    price: 18000,
    stock: 65,
    imageUrl:
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop",
    category: "음료",
    createdAt: "2026-01-03T00:00:00Z",
    updatedAt: "2026-01-11T00:00:00Z",
  },
  {
    id: "prod-022",
    name: "프리미엄 꿀 선물세트",
    description: "국내산 야생화 꿀 세트",
    price: 25000,
    stock: 55,
    imageUrl:
      "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=400&fit=crop",
    category: "건강",
    createdAt: "2026-01-02T00:00:00Z",
    updatedAt: "2026-01-10T00:00:00Z",
  },
  {
    id: "prod-023",
    name: "고급 젓갈 선물세트",
    description: "전통 방식으로 담근 젓갈 세트",
    price: 28000,
    stock: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1598543838096-e13da83c01ed?w=400&h=400&fit=crop",
    category: "식품",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-09T00:00:00Z",
  },
  {
    id: "prod-024",
    name: "명품 한과 선물세트",
    description: "전통 방식 그대로 만든 고급 한과",
    price: 42000,
    originalPrice: 50000,
    stock: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
    category: "디저트",
    createdAt: "2025-12-30T00:00:00Z",
    updatedAt: "2026-01-08T00:00:00Z",
  },
  {
    id: "prod-025",
    name: "프리미엄 전복 선물세트",
    description: "완도산 활전복 특선 세트",
    price: 85000,
    originalPrice: 100000,
    stock: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=400&fit=crop",
    category: "식품",
    createdAt: "2025-12-29T00:00:00Z",
    updatedAt: "2026-01-07T00:00:00Z",
  },
  {
    id: "prod-026",
    name: "보험사 단체선물 패키지",
    description: "보험사 고객 감사 선물용 패키지",
    price: 15000,
    stock: 200,
    imageUrl:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    category: "생활",
    createdAt: "2025-12-28T00:00:00Z",
    updatedAt: "2026-01-06T00:00:00Z",
  },
  {
    id: "prod-027",
    name: "은행 고객 답례품 세트",
    description: "은행 VIP 고객용 답례품",
    price: 22000,
    stock: 150,
    imageUrl:
      "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?w=400&h=400&fit=crop",
    category: "생활",
    createdAt: "2025-12-27T00:00:00Z",
    updatedAt: "2026-01-05T00:00:00Z",
  },
  {
    id: "prod-028",
    name: "공공기관 행사 기념품",
    description: "공공기관 행사용 기념품 세트",
    price: 18000,
    stock: 180,
    imageUrl:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=400&fit=crop",
    category: "생활",
    createdAt: "2025-12-26T00:00:00Z",
    updatedAt: "2026-01-04T00:00:00Z",
  },
];
